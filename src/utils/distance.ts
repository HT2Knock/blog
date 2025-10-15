const HCM = { lat: 10.7769, lon: 106.7009 } as const;
const NEIGHBOR_THRESHOLD_KM = 500;

const getDistanceKm = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
) => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export const getDistanceText = async (): Promise<string> => {
  const text = "I have no idea where you are";

  try {
    const url = new URL("https://ipinfo.io/json");
    if (import.meta.env.DEV) {
      url.searchParams.append("token", import.meta.env.IP_INFO_KEY);
    }

    const response = await fetch(url);
    if (!response.ok) {
      return text;
    }

    const data = await response.json();
    if (!data?.loc) {
      return text;
    }

    const [lat, lon] = data.loc.split(",").map(Number);

    if (isNaN(lat) || isNaN(lon)) {
      return text;
    }

    const km = getDistanceKm(HCM.lat, HCM.lon, lat, lon);

    return km < NEIGHBOR_THRESHOLD_KM
      ? `mean we're basically neighbors`
      : `is roughly ${km.toFixed(1)} km away`;
  } catch (error: unknown) {
    console.error(error);
    return text;
  }
};

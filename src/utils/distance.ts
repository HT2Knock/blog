import { IP_INFO_KEY } from "astro:env/server";
import { isDev } from "./env";

const HCM = { lat: 10.7769, lon: 106.7009 } as const;
const NEIGHBOR_THRESHOLD_KM = 500;
const EARTH_RADIUS_KM = 6371;

const toRadians = (degrees: number): number => {
  return (degrees * Math.PI) / 180;
};

const getDistanceKm = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
) => {
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const lat1Rad = toRadians(lat1);
  const lat2Rad = toRadians(lat2);

  // Haversine formula
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(dLon / 2) ** 2;

  const angularDistance = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return EARTH_RADIUS_KM * angularDistance;
};

export const getDistanceText = async (): Promise<{
  text: string;
  country?: string;
}> => {
  const text = "I have no idea where you are";

  try {
    const url = new URL("https://ipinfo.io/json");
    if (!isDev) {
      url.searchParams.append("token", IP_INFO_KEY);
    }

    const response = await fetch(url);
    if (!response.ok) {
      return { text };
    }

    const data = await response.json();
    if (!data?.loc) {
      return { text };
    }

    const [lat, lon] = data.loc.split(",").map(Number);

    if (isNaN(lat) || isNaN(lon)) {
      return { text };
    }

    const km = getDistanceKm(HCM.lat, HCM.lon, lat, lon);

    return km < NEIGHBOR_THRESHOLD_KM
      ? { text: `mean we're basically neighbors`, country: data.country }
      : { text: `is roughly ${km.toFixed(1)} km away`, country: data.country };
  } catch (error: unknown) {
    console.error(error);
    return { text };
  }
};

export const HCM = { lat: 10.7769, lon: 106.7009 } as const;
export const NEIGHBOR_THRESHOLD_KM = 1000;
const EARTH_RADIUS_KM = 6371;
export const DEFAULT_INTRO =
  "home to endless coffee, chaotic traffic that’s somehow organized, and great cuisine.";

const toRadians = (degrees: number): number => {
  return (degrees * Math.PI) / 180;
};

export const getDistanceKm = (
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

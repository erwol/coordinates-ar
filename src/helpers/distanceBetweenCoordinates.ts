import { EARTH_RADIUS_IN_METERS } from "../constants";
import { toRadians } from "./toRadians";

// Function to calculate the distance between two geographical points in meters
export const distanceBetweenCoordinates = (
  coord1: { latitude: number; longitude: number },
  coord2: { latitude: number; longitude: number },
): number => {
  const lat1 = toRadians(coord1.latitude);
  const lon1 = toRadians(coord1.longitude);
  const lat2 = toRadians(coord2.latitude);
  const lon2 = toRadians(coord2.longitude);

  // Differences in coordinates
  const dLat = lat2 - lat1;
  const dLon = lon2 - lon1;

  // Haversine formula
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // Calculate distance in meters
  const distanceInMeters = EARTH_RADIUS_IN_METERS * c; // Distance in meters
  return distanceInMeters;
};

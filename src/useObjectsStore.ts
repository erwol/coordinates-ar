import { create } from "zustand";
import { EARTH_RADIUS_IN_METERS } from "./constants";

export const NUMBER_OF_OBJECTS = 3;
export const METERS_AROUND = 10;

// Type definitions
interface Coordinate {
  latitude: number;
  longitude: number;
}

interface Object {
  id: string;
  coordinate: Coordinate;
  name: string;
}

interface ObjectStore {
  objects: Object[];
  generateObjects: (center: Coordinate) => void;
}

// Create the store using Zustand
export const useObjectStore = create<ObjectStore>((set) => ({
  objects: [],
  generateObjects: (center) => {
    const objects = [];
    for (let i = 0; i < NUMBER_OF_OBJECTS; i++) {
      const randomObject = generateRandomObjectInRadius(center, METERS_AROUND);
      objects.push(randomObject);
    }
    set({ objects });
  },
}));

const generateRandomObjectInRadius = (
  center: Coordinate,
  radiusInMeters: number,
) => {
  // Random angle in radians
  const randomAngle = Math.random() * 2 * Math.PI;

  // Random distance within the given radius
  const randomDistance = Math.random() * radiusInMeters;

  // Calculate the offset in latitude and longitude
  const deltaLatitude =
    (randomDistance * (180 / Math.PI)) / EARTH_RADIUS_IN_METERS;
  const deltaLongitude =
    (randomDistance * (180 / Math.PI)) /
    (EARTH_RADIUS_IN_METERS * Math.cos(center.latitude * (Math.PI / 180)));

  // Calculate new latitude and longitude
  const newLatitude = center.latitude + deltaLatitude * Math.sin(randomAngle);
  const newLongitude =
    center.longitude + deltaLongitude * Math.cos(randomAngle);

  return {
    id: `obj-${Math.random().toString(36).substring(2, 15)}`, // Unique ID
    coordinate: { latitude: newLatitude, longitude: newLongitude },
    name: `Object ${Math.floor(Math.random() * 1000)}`, // Random name
  };
};

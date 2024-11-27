import { GeoARItem } from "./types";

export const EARTH_RADIUS_IN_METERS = 6371000;

const MEDIA_PREFIX = "/ar/";
export const DISPLAY_RADIUS_METERS = 50;
export const AR_ITEMS: GeoARItem[] = [
  {
    id: 1,
    src: `${MEDIA_PREFIX}arco.png`,
    lat: 40.4356715,
    lng: -3.7210929,
    name: "arco",
  },
  {
    id: 2,
    src: `${MEDIA_PREFIX}baleares.png`,
    lat: 39.570923,
    lng: 2.6401438,
    name: "baleares",
  },
  {
    id: 3,
    src: `${MEDIA_PREFIX}caidos.png`,
    lat: 40.6413603,
    lng: -4.1595682,
    name: "caidos",
  },
  {
    id: 4,
    src: `${MEDIA_PREFIX}carrero.png`,
    lat: 43.4398743,
    lng: -3.4514013,
    name: "carrero",
  },
  {
    id: 5,
    src: `${MEDIA_PREFIX}ebro.png`,
    lat: 40.8138502,
    lng: 0.5200469,
    name: "ebro",
  },
];

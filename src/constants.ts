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
    lat: 28.3778098,
    lng: -16.8041513,
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
  {
    id: 6,
    src: `${MEDIA_PREFIX}llano.png`,
    lat: 35.9019722,
    lng: -5.2964619,
    name: "llano",
  },
  {
    id: 7,
    src: `${MEDIA_PREFIX}mola.png`,
    lat: 42.4513837,
    lng: -3.3607398,
    name: "mola",
  },
  {
    id: 8,
    src: `${MEDIA_PREFIX}navarra.png`,
    lat: 42.8090806,
    lng: -1.6350326,
    name: "navarra",
  },
  {
    id: 9,
    src: `${MEDIA_PREFIX}piramide.png`,
    lat: 43.0401376,
    lng: -3.8782522,
    name: "piramide",
  },
  {
    id: 10,
    src: `${MEDIA_PREFIX}valle.png`,
    lat: 40.6419984,
    lng: -4.1506207,
    name: "valle",
  },
  {
    id: 11,
    src: `${MEDIA_PREFIX}sol.png`,
    lat: 40.416638,
    lng: -3.7038603,
    name: "sol",
    audio: `${MEDIA_PREFIX}sol.mp3`,
  },
];

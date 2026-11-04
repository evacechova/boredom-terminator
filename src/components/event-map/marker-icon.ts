import { icon } from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const getImageUrl = (image: string | { src: string }): string =>
  typeof image === "string" ? image : image.src;

export const defaultMarkerIcon = icon({
  iconUrl: getImageUrl(markerIcon),
  iconRetinaUrl: getImageUrl(markerIcon2x),
  shadowUrl: getImageUrl(markerShadow),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});

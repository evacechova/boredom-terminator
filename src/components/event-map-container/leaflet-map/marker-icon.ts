import { divIcon } from "leaflet";
import { mapMarkerSvg } from "@/styles/map-marker";

export const defaultMarkerIcon = divIcon({
  className: "event-marker",
  html: mapMarkerSvg,
  iconSize: [44, 48],
  iconAnchor: [22, 44],
  tooltipAnchor: [18, -24],
});

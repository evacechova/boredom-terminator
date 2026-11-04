"use client";

import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { defaultMarkerIcon } from "./marker-icon";
import type { MapEvent } from "@/domain/events/types";

type LeafletMapProps = {
  events: MapEvent[];
  onEventSelect: (eventId: string) => void;
};

const LeafletMap = ({ events, onEventSelect }: LeafletMapProps) => {
  return (
    <MapContainer center={[50.0755, 14.4378]} zoom={13} className="absolute inset-0">
      <TileLayer
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {events.map((event) => (
        <Marker
          key={event.id}
          position={[event.location.latitude, event.location.longitude]}
          icon={defaultMarkerIcon}
          eventHandlers={{
            click: () => onEventSelect(event.id),
          }}
        />
      ))}
    </MapContainer>
  );
};
export default LeafletMap;

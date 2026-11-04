"use client";

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { defaultMarkerIcon } from "./marker-icon";
import type { MapEvent } from "@/domain/events/types";

type LeafletMapProps = {
  events: MapEvent[];
  onEventSelect: (eventId: string) => void;
  onMapClick: () => void;
};

const MapClickHandler = ({ onMapClick }: { onMapClick: () => void }) => {
  useMapEvents({
    click: onMapClick,
  });

  return null;
};

const LeafletMap = ({ events, onEventSelect, onMapClick }: LeafletMapProps) => {
  return (
    <MapContainer center={[50.0755, 14.4378]} zoom={13} className="absolute inset-0">
      <MapClickHandler onMapClick={onMapClick} />
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

"use client";

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { defaultMarkerIcon } from "./marker-icon";
import type { MapEvent } from "@/domain/events/types";

type LeafletMapProps = {
  events: MapEvent[];
  selectedEventId: string | null;
  onEventSelect: (eventId: string) => void;
  onMapClick: () => void;
};

const MapClickHandler = ({ onMapClick }: { onMapClick: () => void }) => {
  useMapEvents({
    click: onMapClick,
  });

  return null;
};

const LeafletMap = ({ events, selectedEventId, onEventSelect, onMapClick }: LeafletMapProps) => {
  return (
    <MapContainer center={[50.0755, 14.4378]} zoom={13} className="absolute inset-0">
      <MapClickHandler onMapClick={onMapClick} />
      <TileLayer
        url={`https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png?key=${process.env.NEXT_PUBLIC_CARTO_API_KEY}`}
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        subdomains="abcd"
        maxZoom={20}
      />
      {events.map((event) => (
        <Marker
          key={event.id}
          position={[event.location.latitude, event.location.longitude]}
          icon={defaultMarkerIcon}
          ref={(marker) => {
            marker
              ?.getElement()
              ?.classList.toggle("event-marker-selected", event.id === selectedEventId);
          }}
          title={event.title}
          alt={event.title}
          zIndexOffset={event.id === selectedEventId ? 1000 : 0}
          eventHandlers={{
            click: () => onEventSelect(event.id),
            keydown: (keyboardEvent) => {
              if (keyboardEvent.originalEvent.key === "Enter") {
                onEventSelect(event.id);
              }
            },
          }}
        />
      ))}
    </MapContainer>
  );
};
export default LeafletMap;

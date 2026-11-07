"use client";

import dynamic from "next/dynamic";
import type { MapEvent } from "@/domain/events/types";
import { type ReactNode, useState, useRef } from "react";
import { EventPanel } from "./EventPanel";

type SelectedEventId = string | null;
type EventDiscoveryProps = {
  events: MapEvent[];
  children?: ReactNode;
};

const LeafletMap = dynamic(() => import("./LeafletMap").then((module) => module.LeafletMap), {
  ssr: false,
});

export const EventDiscovery = ({ events, children }: EventDiscoveryProps) => {
  const [selectedEventId, setSelectedEventId] = useState<SelectedEventId>(null);
  const lastFocusedMarkerRef = useRef<HTMLElement | null>(null);
  const selectedEvent = events.find((event) => event.id === selectedEventId);
  const handleEventSelect = (eventId: string, markerElement: HTMLElement | null) => {
    lastFocusedMarkerRef.current = markerElement;
    setSelectedEventId(eventId);
  };

  const handlePanelClose = () => {
    const marker = lastFocusedMarkerRef.current;
    lastFocusedMarkerRef.current = null;
    setSelectedEventId(null);
    if (marker?.isConnected) {
      marker.focus();
    }
  };

  const handleMapClick = () => {
    lastFocusedMarkerRef.current = null;
    setSelectedEventId(null);
  };

  return (
    <>
      <LeafletMap
        events={events}
        selectedEventId={selectedEventId}
        onEventSelect={handleEventSelect}
        onMapClick={handleMapClick}
      />

      {selectedEvent ? <EventPanel event={selectedEvent} onClose={handlePanelClose} /> : children}
    </>
  );
};

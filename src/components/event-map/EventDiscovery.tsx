"use client";

import dynamic from "next/dynamic";
import type { MapEvent } from "@/domain/events/types";
import { useState, useRef } from "react";
import { EventPanel } from "./EventPanel";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { PlusIcon } from "@heroicons/react/24/outline";

type SelectedEventId = string | null;
type EventDiscoveryProps = {
  events: MapEvent[];
};

const LeafletMap = dynamic(() => import("./LeafletMap").then((module) => module.LeafletMap), {
  ssr: false,
});

export const EventDiscovery = ({ events }: EventDiscoveryProps) => {
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

      {selectedEvent ? (
        <EventPanel event={selectedEvent} onClose={handlePanelClose} />
      ) : (
        <ButtonLink
          href="/events/new"
          aria-label="Add event"
          className="btn-circle fixed right-4 bottom-[max(2rem,env(safe-area-inset-bottom))] z-[1000] size-[clamp(3rem,8vw,4rem)] shadow-lg sm:right-6"
        >
          <PlusIcon aria-hidden="true" className="size-1/2" strokeWidth={2} />
        </ButtonLink>
      )}
    </>
  );
};

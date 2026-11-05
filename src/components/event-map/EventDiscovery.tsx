"use client";

import dynamic from "next/dynamic";
import type { MapEvent } from "@/domain/events/types";
import { type ReactNode, useState } from "react";
import { EventPanel } from "./EventPanel";

type SelectedEventId = string | null;
type EventDiscoveryProps = {
  events: MapEvent[];
  children?: ReactNode;
};

const LeafletMap = dynamic(() => import("./LeafletMap"), {
  ssr: false,
});

export const EventDiscovery = ({ events, children }: EventDiscoveryProps) => {
  const [selectedEventId, setSelectedEventId] = useState<SelectedEventId>(null);

  const selectedEvent = events.find((event) => event.id === selectedEventId);

  return (
    <>
      <LeafletMap
        events={events}
        selectedEventId={selectedEventId}
        onEventSelect={setSelectedEventId}
        onMapClick={() => setSelectedEventId(null)}
      />

      {selectedEvent ? (
        <EventPanel event={selectedEvent} onClose={() => setSelectedEventId(null)} />
      ) : (
        children
      )}
    </>
  );
};

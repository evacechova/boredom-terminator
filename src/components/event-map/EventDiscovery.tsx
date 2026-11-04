"use client";

import dynamic from "next/dynamic";
import type { MapEvent } from "@/domain/events/types";
import { useState } from "react";
import { EventPanel } from "./EventPanel";

type SelectedEventId = string | null;
type EventDiscoveryProps = {
  events: MapEvent[];
};

const LeafletMap = dynamic(() => import("./LeafletMap"), {
  ssr: false,
});

export const EventDiscovery = ({ events }: EventDiscoveryProps) => {
  const [selectedEventId, setSelectedEventId] = useState<SelectedEventId>(null);

  const selectedEvent = events.find((event) => event.id === selectedEventId);

  return (
    <>
      <LeafletMap
        events={events}
        onEventSelect={setSelectedEventId}
        onMapClick={() => setSelectedEventId(null)}
      />

      {selectedEvent !== undefined && (
        <EventPanel event={selectedEvent} onClose={() => setSelectedEventId(null)} />
      )}
    </>
  );
};

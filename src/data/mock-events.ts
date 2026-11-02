import type { MapEvent } from "@/domain/events/types";

export const mockEvents: MapEvent[] = [
  {
    id: "mock-1",
    title: "K-pop dance meetup",
    startsAt: "2026-11-07T14:00:00Z",
    location: {
      latitude: 50.08,
      longitude: 14.42,
    },
  },
];

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
  {
    id: "mock-2",
    title: "K-pop cover practice",
    startsAt: "2026-11-08T13:00:00Z",
    location: {
      latitude: 50.095,
      longitude: 14.425,
    },
    venueName: "Letenské sady",
    description: "An informal outdoor meetup to practise K-pop choreography together.",
  },
  {
    id: "mock-3",
    title: "Random play dance",
    startsAt: "2026-11-08T15:00:00Z",
    location: {
      latitude: 50.078,
      longitude: 14.449,
    },
  },
];

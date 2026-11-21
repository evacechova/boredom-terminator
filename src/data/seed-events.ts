import type { MapEvent } from "@/core/events/types";
import { getDefaultEventEnd } from "@/core/events/get-default-event-end";

export function createSeedEvents(now: Date): MapEvent[] {
  const hourInMs = 60 * 60 * 1000;
  const startsAt = new Date(now.getTime() - hourInMs).toISOString();

  return [
    {
      id: "mock-1",
      title: "Random play dance",
      category: "random_play_dance",
      startsAt,
      endsAt: getDefaultEventEnd(startsAt),
      createdAt: now.toISOString(),
      location: {
        city: "Praha",
        latitude: 50.064174,
        longitude: 14.41865,
      },
      venueName: "Vyšehrad",
    },
  ];
}

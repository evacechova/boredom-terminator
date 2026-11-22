import type { MapEvent } from "@/core/events/types";
import { getDefaultEventEnd } from "@/core/events/get-default-event-end";

const hourInMs = 60 * 60 * 1000;

export function createSeedEvents(now: Date): MapEvent[] {
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
    {
      id: "mock-2",
      title: "Cute Cats cover shoot",
      category: "cover_shoot",
      startsAt: new Date(now.getTime() + 7 * hourInMs).toISOString(),
      endsAt: new Date(now.getTime() + 10 * hourInMs).toISOString(),
      createdAt: now.toISOString(),
      location: {
        city: "Praha",
        latitude: 50.0814917,
        longitude: 14.4266722,
      },
      venueName: "Václavské náměstí",
    },
    {
      id: "mock-3",
      title: "Photocard event",
      category: "fan_event",
      startsAt: new Date(now.getTime() + 72 * hourInMs).toISOString(),
      endsAt: new Date(now.getTime() + 240 * hourInMs).toISOString(),
      createdAt: now.toISOString(),
      location: {
        city: "Praha",
        latitude: 50.083236,
        longitude: 14.427107,
      },
      venueName: "Punchy Cup",
    },
  ];
}

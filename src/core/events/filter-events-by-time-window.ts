import { defaultEventWindowHours } from "@/config/app-config";
import { getDefaultEventEnd } from "./get-default-event-end";
import type { MapEvent } from "./types";

export function filterEventsByTimeWindow(
  events: MapEvent[],
  now: Date,
  windowHours: number = defaultEventWindowHours,
): MapEvent[] {
  const currentTimeInMilliseconds = now.getTime();
  const windowDurationInMilliseconds = windowHours * 60 * 60 * 1000;

  return events.filter((event) => {
    const startInMilliseconds = new Date(event.startsAt).getTime();
    const endInMilliseconds = new Date(
      event.endsAt ?? getDefaultEventEnd(event.startsAt),
    ).getTime();

    const hasNotEnded = endInMilliseconds > currentTimeInMilliseconds;
    const startsWithinWindow =
      startInMilliseconds <= currentTimeInMilliseconds + windowDurationInMilliseconds;

    return hasNotEnded && startsWithinWindow;
  });
}

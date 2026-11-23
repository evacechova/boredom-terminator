import type { MapEvent } from "./types";

export function sortEventsByStart(events: MapEvent[]): MapEvent[] {
  const sortedEvents = [...events].sort((firstEvent, secondEvent) => {
    const firstStartInMilliseconds = new Date(firstEvent.startsAt).getTime();
    const secondStartInMilliseconds = new Date(secondEvent.startsAt).getTime();

    return firstStartInMilliseconds - secondStartInMilliseconds;
  });

  return sortedEvents;
}

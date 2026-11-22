import { defaultEventWindowHours } from "@/config/app-config";
import { filterEventsByTimeWindow } from "./filter-events-by-time-window";
import type { MapEvent } from "./types";

describe("filterEventsByTimeWindow", () => {
  const now = new Date("2026-11-21T10:00:00Z");
  const testEvent: MapEvent = {
    id: "event",
    title: "Test event",
    category: "fan_event",
    startsAt: "2026-11-21T09:00:00Z",
    location: { city: "Praha", latitude: 50.0755, longitude: 14.4378 },
    createdAt: "2026-11-20T12:00:00Z",
  };

  it("keeps an ongoing event but excludes one ending exactly at now", () => {
    const endedEvent = {
      ...testEvent,
      id: "ended",
      endsAt: now.toISOString(),
    };
    const ongoingEvent = {
      ...endedEvent,
      id: "ongoing",
      endsAt: "2026-11-21T11:00:00Z",
    };

    expect(filterEventsByTimeWindow([endedEvent, ongoingEvent], now)).toEqual([ongoingEvent]);
  });

  it("includes the configured window boundary but excludes later starts", () => {
    const windowEnd = new Date(now.getTime());
    windowEnd.setUTCHours(now.getUTCHours() + defaultEventWindowHours);
    const boundaryEvent = {
      ...testEvent,
      id: "boundary",
      startsAt: windowEnd.toISOString(),
    };
    const laterEvent = {
      ...boundaryEvent,
      id: "later",
      startsAt: new Date(windowEnd.getTime() + 1).toISOString(),
    };

    expect(filterEventsByTimeWindow([boundaryEvent, laterEvent], now)).toEqual([boundaryEvent]);
  });

  it("uses the default two-hour end when endsAt is missing", () => {
    const endedEvent = {
      ...testEvent,
      id: "ended-without-end",
      startsAt: "2026-11-21T08:00:00Z",
    };
    const ongoingEvent = {
      ...endedEvent,
      id: "ongoing-without-end",
      startsAt: "2026-11-21T09:00:00Z",
    };

    expect(filterEventsByTimeWindow([endedEvent, ongoingEvent], now)).toEqual([ongoingEvent]);
  });
});

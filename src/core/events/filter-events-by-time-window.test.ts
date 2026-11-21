import { filterEventsByTimeWindow } from "./filter-events-by-time-window";
import type { MapEvent } from "./types";

describe("filterEventsByTimeWindow", () => {
  it("keeps an ongoing event but excludes one ending exactly at now", () => {
    const now = new Date("2026-11-21T10:00:00Z");
    const endedEvent: MapEvent = {
      id: "ended",
      title: "Ended event",
      category: "fan_event",
      startsAt: "2026-11-21T09:00:00Z",
      endsAt: "2026-11-21T10:00:00Z",
      location: {
        city: "Praha",
        latitude: 50.0755,
        longitude: 14.4378,
      },
      createdAt: "2026-11-20T12:00:00Z",
    };
    const ongoingEvent: MapEvent = {
      ...endedEvent,
      id: "ongoing",
      title: "Ongoing event",
      endsAt: "2026-11-21T11:00:00Z",
    };

    const result = filterEventsByTimeWindow([endedEvent, ongoingEvent], now);

    expect(result).toEqual([ongoingEvent]);
  });

  it("includes a start exactly 24 hours away but excludes one millisecond later", () => {
    const now = new Date("2026-11-21T10:00:00Z");
    const boundaryEvent: MapEvent = {
      id: "boundary",
      title: "Event at the window boundary",
      category: "fan_event",
      startsAt: "2026-11-22T10:00:00.000Z",
      location: {
        city: "Praha",
        latitude: 50.0755,
        longitude: 14.4378,
      },
      createdAt: "2026-11-20T12:00:00Z",
    };
    const laterEvent: MapEvent = {
      ...boundaryEvent,
      id: "later",
      startsAt: "2026-11-22T10:00:00.001Z",
    };

    const result = filterEventsByTimeWindow([boundaryEvent, laterEvent], now);

    expect(result).toEqual([boundaryEvent]);
  });

  it("uses the default two-hour end when endsAt is missing", () => {
    const now = new Date("2026-11-21T10:00:00Z");
    const endedEvent: MapEvent = {
      id: "ended-without-end",
      title: "Event without an explicit end",
      category: "fan_event",
      startsAt: "2026-11-21T08:00:00Z",
      location: { city: "Praha", latitude: 50.0755, longitude: 14.4378 },
      createdAt: "2026-11-20T12:00:00Z",
    };
    const ongoingEvent: MapEvent = {
      ...endedEvent,
      id: "ongoing-without-end",
      startsAt: "2026-11-21T09:00:00Z",
    };

    expect(filterEventsByTimeWindow([endedEvent, ongoingEvent], now)).toEqual([ongoingEvent]);
  });

  it("uses an explicit 36-hour window instead of the default", () => {
    const now = new Date("2026-11-21T10:00:00Z");
    const boundaryEvent: MapEvent = {
      id: "custom-boundary",
      title: "Event at the custom window boundary",
      category: "fan_event",
      startsAt: "2026-11-22T22:00:00.000Z",
      location: { city: "Praha", latitude: 50.0755, longitude: 14.4378 },
      createdAt: "2026-11-20T12:00:00Z",
    };
    const laterEvent: MapEvent = {
      ...boundaryEvent,
      id: "after-custom-boundary",
      startsAt: "2026-11-22T22:00:00.001Z",
    };

    expect(filterEventsByTimeWindow([boundaryEvent, laterEvent], now, 36)).toEqual([boundaryEvent]);
  });
});

import { filterEventsByDate } from "./filter-events-by-date";
import type { MapEvent } from "./types";

describe("filterEventsByDate", () => {
  it.each([
    [
      "2026-10-30",
      "2026-10-29T22:59:59.999Z",
      "2026-10-29T23:00:00.000Z",
      "2026-10-30T22:59:59.999Z",
      "2026-10-30T23:00:00.000Z",
    ],
    [
      "2026-03-29",
      "2026-03-28T22:59:59.999Z",
      "2026-03-28T23:00:00.000Z",
      "2026-03-29T21:59:59.999Z",
      "2026-03-29T22:00:00.000Z",
    ],
    [
      "2026-10-25",
      "2026-10-24T21:59:59.999Z",
      "2026-10-24T22:00:00.000Z",
      "2026-10-25T22:59:59.999Z",
      "2026-10-25T23:00:00.000Z",
    ],
  ])(
    "keeps only starts within the Prague calendar day %s",
    (date, beforeMidnight, midnight, lastInstant, nextMidnight) => {
      const firstEvent: MapEvent = {
        id: "first",
        title: "Event starting at midnight",
        category: "fan_event",
        startsAt: midnight,
        location: { city: "Praha", latitude: 50.0755, longitude: 14.4378 },
        createdAt: "2026-01-01T12:00:00Z",
      };
      const overlappingEvent: MapEvent = {
        ...firstEvent,
        id: "previous-day",
        startsAt: beforeMidnight,
        endsAt: nextMidnight,
      };
      const lastEvent: MapEvent = { ...firstEvent, id: "last", startsAt: lastInstant };
      const nextDayEvent: MapEvent = { ...firstEvent, id: "next-day", startsAt: nextMidnight };

      const result = filterEventsByDate(
        [lastEvent, overlappingEvent, firstEvent, nextDayEvent],
        date,
      );

      expect(result).toEqual({ ok: true, value: [lastEvent, firstEvent] });
    },
  );

  it.each(["2026-02-29", "30.10.2026"])("reports an invalid selected date %s", (date) => {
    expect(filterEventsByDate([], date)).toEqual({ ok: false, error: "invalid_date" });
  });
});

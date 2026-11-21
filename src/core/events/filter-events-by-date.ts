import { Temporal } from "@js-temporal/polyfill";
import type { MapEvent } from "./types";

export type FilterEventsByDateResult =
  { ok: true; value: MapEvent[] } | { ok: false; error: "invalid_date" };

export const filterEventsByDate = (events: MapEvent[], date: string): FilterEventsByDateResult => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return { ok: false, error: "invalid_date" };
  }

  let selectedDate: Temporal.PlainDate;

  try {
    selectedDate = Temporal.PlainDate.from(date, { overflow: "reject" });
  } catch {
    return { ok: false, error: "invalid_date" };
  }

  const midnightInMilliseconds = selectedDate.toZonedDateTime("Europe/Prague").epochMilliseconds;
  const nextMidnightInMilliseconds = selectedDate
    .add({ days: 1 })
    .toZonedDateTime("Europe/Prague").epochMilliseconds;

  const filteredEvents = events.filter((event) => {
    const startInMilliseconds = new Date(event.startsAt).getTime();
    const startsOnOrAfterMidnight = startInMilliseconds >= midnightInMilliseconds;
    const startsBeforeNextMidnight = startInMilliseconds < nextMidnightInMilliseconds;

    return startsOnOrAfterMidnight && startsBeforeNextMidnight;
  });

  return { ok: true, value: filteredEvents };
};

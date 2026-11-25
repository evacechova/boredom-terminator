import { Temporal } from "@js-temporal/polyfill";
import type { MapEvent } from "./types";

export const filterEventsByDate = (events: MapEvent[], date: string): MapEvent[] | undefined => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return undefined;
  }

  let selectedDate: Temporal.PlainDate;

  try {
    selectedDate = Temporal.PlainDate.from(date, { overflow: "reject" });
  } catch {
    return undefined;
  }

  const midnightInMilliseconds = selectedDate.toZonedDateTime("Europe/Prague").epochMilliseconds;
  const nextMidnightInMilliseconds = selectedDate
    .add({ days: 1 })
    .toZonedDateTime("Europe/Prague").epochMilliseconds;

  return events.filter((event) => {
    const startInMilliseconds = new Date(event.startsAt).getTime();
    const startsOnOrAfterMidnight = startInMilliseconds >= midnightInMilliseconds;
    const startsBeforeNextMidnight = startInMilliseconds < nextMidnightInMilliseconds;

    return startsOnOrAfterMidnight && startsBeforeNextMidnight;
  });
};

import { Temporal } from "@js-temporal/polyfill";

export type LocalDateTimeToUtcResult =
  | { ok: true; value: string }
  | {
      ok: false;
      error: "invalid_input" | "invalid_time_zone" | "nonexistent_time" | "ambiguous_time";
    };

/** Converts YYYY-MM-DD and HH:mm in the event's time zone to UTC. */
export const localDateTimeToUtc = (
  date: string,
  time: string,
  timeZone: string,
): LocalDateTimeToUtcResult => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !/^\d{2}:\d{2}$/.test(time)) {
    return { ok: false, error: "invalid_input" };
  }

  let localDateTime: Temporal.PlainDateTime;

  try {
    localDateTime = Temporal.PlainDateTime.from(`${date}T${time}`, {
      overflow: "reject",
    });
  } catch {
    return { ok: false, error: "invalid_input" };
  }

  let earlier: Temporal.ZonedDateTime;
  let later: Temporal.ZonedDateTime;

  // Compare both interpretations to detect skipped and repeated local times.
  try {
    earlier = localDateTime.toZonedDateTime(timeZone, {
      disambiguation: "earlier",
    });
    later = localDateTime.toZonedDateTime(timeZone, {
      disambiguation: "later",
    });
  } catch {
    return { ok: false, error: "invalid_time_zone" };
  }

  if (!earlier.toPlainDateTime().equals(localDateTime)) {
    return { ok: false, error: "nonexistent_time" };
  }

  if (earlier.epochNanoseconds !== later.epochNanoseconds) {
    return { ok: false, error: "ambiguous_time" };
  }

  return { ok: true, value: earlier.toInstant().toString() };
};

import { localDateTimeToUtc } from "./local-date-time-to-utc";

describe("localDateTimeToUtc", () => {
  it.each([
    ["2026-07-15", "18:00", "Europe/Prague", "2026-07-15T16:00:00Z"],
    ["2026-01-15", "18:00", "Europe/Prague", "2026-01-15T17:00:00Z"],
    ["2026-07-15", "18:00", "America/New_York", "2026-07-15T22:00:00Z"],
    ["2026-07-15", "00:15", "Asia/Kathmandu", "2026-07-14T18:30:00Z"],
  ])("converts %s %s in %s to UTC", (date, time, timeZone, expected) => {
    expect(localDateTimeToUtc(date, time, timeZone)).toEqual({
      ok: true,
      value: expected,
    });
  });

  it.each([
    ["2026-03-29", "02:30", "Europe/Prague", "nonexistent_time"],
    ["2026-10-25", "02:30", "Europe/Prague", "ambiguous_time"],
    ["2026-03-08", "02:30", "America/New_York", "nonexistent_time"],
    ["2026-11-01", "01:30", "America/New_York", "ambiguous_time"],
  ])("rejects %s %s in %s as %s", (date, time, timeZone, error) => {
    expect(localDateTimeToUtc(date, time, timeZone)).toEqual({ ok: false, error });
  });

  it.each([
    ["2026-02-29", "18:00"],
    ["2026-04-31", "18:00"],
    ["2026-07-15", "24:00"],
    ["2026-07-15", "18:60"],
    ["15.07.2026", "18:00"],
    ["2026-07-15", "18:00Z"],
  ])("rejects invalid local input %s %s", (date, time) => {
    expect(localDateTimeToUtc(date, time, "Europe/Prague")).toEqual({
      ok: false,
      error: "invalid_input",
    });
  });

  it("reports an invalid time zone instead of using the device time zone", () => {
    expect(localDateTimeToUtc("2026-07-15", "18:00", "Invalid/Zone")).toEqual({
      ok: false,
      error: "invalid_time_zone",
    });
  });
});

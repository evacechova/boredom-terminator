import { getDefaultEventEnd } from "./get-default-event-end";

describe("getDefaultEventEnd", () => {
  it.each([
    ["2026-11-07T14:00:00Z", "2026-11-07T16:00:00.000Z"],
    ["2026-11-07T23:30:00Z", "2026-11-08T01:30:00.000Z"],
    ["2026-03-29T00:30:00Z", "2026-03-29T02:30:00.000Z"],
    ["2026-10-25T00:30:00Z", "2026-10-25T02:30:00.000Z"],
  ])("adds two elapsed hours to %s", (startsAt, expectedEnd) => {
    expect(getDefaultEventEnd(startsAt)).toBe(expectedEnd);
  });
});

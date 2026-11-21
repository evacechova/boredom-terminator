import { createSeedEvents } from "./seed-events";

test.each(["2026-11-21T12:00:00Z", "2027-07-10T23:30:00Z"])(
  "provides an ongoing demo event relative to %s without changing the supplied date",
  (isoNow) => {
    const now = new Date(isoNow);
    const originalTime = now.getTime();

    const events = createSeedEvents(now);

    expect(
      events.some(
        (event) =>
          new Date(event.startsAt).getTime() < originalTime &&
          event.endsAt !== undefined &&
          new Date(event.endsAt).getTime() > originalTime,
      ),
    ).toBe(true);
    expect(now.getTime()).toBe(originalTime);
  },
);

test("keeps the cover shoot seven hours ahead with a three-hour duration", () => {
  const events = createSeedEvents(new Date("2026-11-21T12:00:00Z"));
  const coverShoot = events.find((event) => event.id === "mock-2");

  expect(coverShoot).toMatchObject({
    startsAt: "2026-11-21T19:00:00.000Z",
    endsAt: "2026-11-21T22:00:00.000Z",
  });
});

test.each([
  ["2026-11-21T23:30:00Z", "2026-11-25T08:00:00.000Z", "2026-12-02T08:00:00.000Z"],
  ["2027-03-25T12:00:00Z", "2027-03-28T07:00:00.000Z", "2027-04-04T07:00:00.000Z"],
  ["2027-03-22T12:00:00Z", "2027-03-25T08:00:00.000Z", "2027-04-01T07:00:00.000Z"],
  ["2026-10-19T12:00:00Z", "2026-10-22T07:00:00.000Z", "2026-10-29T08:00:00.000Z"],
])(
  "starts the photocard event three Prague calendar days after %s at 09:00 for one calendar week",
  (isoNow, startsAt, endsAt) => {
    const events = createSeedEvents(new Date(isoNow));
    const photocardEvent = events.find((event) => event.id === "mock-3");

    expect(photocardEvent).toMatchObject({ startsAt, endsAt });
  },
);

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

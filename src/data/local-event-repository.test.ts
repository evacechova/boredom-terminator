import type { MapEvent } from "@/core/events/types";
import { MemoryStorage } from "@/test-utils/memory-storage";
import { createLocalEventRepository, savedEventsStorageKey } from "./local-event-repository";
import { createSeedEvents } from "./seed-events";

const now = new Date("2026-11-22T12:00:00Z");
const testEvent: MapEvent = {
  id: "user:550e8400-e29b-41d4-a716-446655440000",
  title: "Test fan event",
  category: "fan_event",
  startsAt: "2026-11-25T10:00:00Z",
  endsAt: "2026-11-25T12:00:00Z",
  createdAt: "2026-11-22T10:00:00Z",
  location: { city: "Praha", latitude: 50.08, longitude: 14.42 },
};

let storage: MemoryStorage;

beforeEach(() => {
  storage = new MemoryStorage();
});

test("loads seeds on a clean visit and includes valid stored test events when present", () => {
  const repository = createLocalEventRepository(storage, now);

  expect(repository.list()).toEqual(createSeedEvents(now));

  storage.setItem(savedEventsStorageKey, JSON.stringify([testEvent]));

  expect(repository.list()).toEqual([...createSeedEvents(now), testEvent]);
});

test.each([
  "{",
  '{"events":[]}',
  JSON.stringify([
    testEvent,
    { ...testEvent, id: "user:bad-date", startsAt: "not-a-date", endsAt: undefined },
  ]),
])("falls back to seeds when stored data cannot be used: %s", (raw) => {
  storage.setItem(savedEventsStorageKey, raw);

  expect(createLocalEventRepository(storage, now).list()).toEqual(createSeedEvents(now));
});

test("still shows seeds when storage access is denied", () => {
  jest.spyOn(storage, "getItem").mockImplementation(() => {
    throw new Error("Storage access denied");
  });

  expect(createLocalEventRepository(storage, now).list()).toEqual(createSeedEvents(now));
});

test.each(["mock-1", testEvent.id])("falls back to seeds for a colliding event ID: %s", (id) => {
  storage.setItem(savedEventsStorageKey, JSON.stringify([testEvent, { ...testEvent, id }]));

  expect(createLocalEventRepository(storage, now).list()).toEqual(createSeedEvents(now));
});

test("reset removes only our saved events and restores the seed-only demo", () => {
  storage.setItem(savedEventsStorageKey, JSON.stringify([testEvent]));
  storage.setItem("other-app", "untouched");
  const repository = createLocalEventRepository(storage, now);

  repository.resetSaved();

  expect(storage.getItem(savedEventsStorageKey)).toBeNull();
  expect(storage.getItem("other-app")).toBe("untouched");
  expect(repository.list()).toEqual(createSeedEvents(now));
});

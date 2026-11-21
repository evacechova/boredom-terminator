import type { MapEvent } from "@/core/events/types";
import { storedEventSchema } from "@/core/events/stored-event-schema";
import { MemoryStorage } from "@/test-utils/memory-storage";
import { createLocalEventRepository, savedEventsStorageKey } from "./local-event-repository";
import { createSeedEvents } from "./seed-events";

const now = new Date("2026-11-21T12:00:00Z");
const seedIds = ["mock-1", "mock-2", "mock-3"];

const createSavedEvent = (overrides: Partial<MapEvent> = {}): MapEvent => ({
  id: "user:550e8400-e29b-41d4-a716-446655440000",
  title: "Historical fan event",
  category: "fan_event",
  startsAt: "2020-01-01T10:00:00Z",
  endsAt: "2020-01-01T12:00:00Z",
  createdAt: "2019-12-01T10:00:00Z",
  location: { city: "Praha", latitude: 50.08, longitude: 14.42 },
  ...overrides,
});

describe("stored event validation", () => {
  test("accepts all eight categories, optional end, and original text", () => {
    const categories = [
      "random_play_dance",
      "cover_shoot",
      "dance_class",
      "festival",
      "party",
      "fan_event",
      "concert",
      "store_event",
    ];

    for (const category of categories) {
      const record = { ...createSavedEvent(), category, title: "  Fan event  " };
      expect(storedEventSchema.parse(record)).toEqual(record);
    }
    expect(storedEventSchema.safeParse(createSavedEvent({ endsAt: undefined })).success).toBe(true);
  });

  test.each([
    ["empty identity", { id: " " }],
    ["empty title", { title: "\t " }],
    ["unknown category", { category: "unknown" }],
    ["invalid calendar date", { createdAt: "2026-02-30T10:00:00Z" }],
    ["non-UTC timestamp", { createdAt: "2026-01-01T10:00:00+01:00" }],
    ["end equal to start", { endsAt: "2020-01-01T10:00:00Z" }],
    ["end before start", { endsAt: "2020-01-01T09:00:00Z" }],
    ["latitude outside range", { location: { city: "Praha", latitude: 91, longitude: 14 } }],
    ["longitude outside range", { location: { city: "Praha", latitude: 50, longitude: 181 } }],
    ["wrong city", { location: { city: "Brno", latitude: 50, longitude: 14 } }],
    ["wrong optional type", { venueName: 42 }],
  ])("rejects %s", (_description, overrides) => {
    expect(storedEventSchema.safeParse({ ...createSavedEvent(), ...overrides }).success).toBe(
      false,
    );
  });

  test.each([
    ["title", 100],
    ["venueName", 120],
    ["description", 500],
    ["sourceUrl", 2048],
  ])("enforces the shared %s length limit", (field, limit) => {
    const prefix = field === "sourceUrl" ? "https://example.com/" : "";
    const value = prefix + "a".repeat(Number(limit) - prefix.length);

    expect(storedEventSchema.safeParse({ ...createSavedEvent(), [field]: value }).success).toBe(
      true,
    );
    expect(
      storedEventSchema.safeParse({ ...createSavedEvent(), [field]: value + "a" }).success,
    ).toBe(false);
  });
});

describe("local event repository", () => {
  let storage: MemoryStorage;

  beforeEach(() => {
    storage = new MemoryStorage();
  });

  test.each(["{", "null", '{"events":[]}'])(
    "keeps seeds available, blocks unsafe writes, and allows explicit reset for unreadable storage %s",
    (raw) => {
      storage.setItem(savedEventsStorageKey, raw);
      const repository = createLocalEventRepository(storage, now);
      const setItem = jest.spyOn(storage, "setItem");

      const result = repository.list();

      expect(result.events.map((event) => event.id)).toEqual(seedIds);
      expect(result.storageIssue).toBe("invalid_format");
      expect(() => repository.add(createSavedEvent())).toThrow();
      expect(() => repository.removeInvalid()).toThrow();
      expect(setItem).not.toHaveBeenCalled();
      expect(storage.getItem(savedEventsStorageKey)).toBe(raw);

      repository.resetSaved();

      expect(storage.getItem(savedEventsStorageKey)).toBeNull();
      expect(repository.list().storageIssue).toBeNull();
    },
  );

  test("keeps seeds available when reading fails and refuses destructive recovery or add", () => {
    const error = new Error("Storage access denied");
    jest.spyOn(storage, "getItem").mockImplementation(() => {
      throw error;
    });
    const setItem = jest.spyOn(storage, "setItem");
    const repository = createLocalEventRepository(storage, now);

    const result = repository.list();

    expect(result.events.map((event) => event.id)).toEqual(seedIds);
    expect(result.storageIssue).toBe("read_error");
    expect(() => repository.add(createSavedEvent())).toThrow(error);
    expect(() => repository.removeInvalid()).toThrow(error);
    expect(setItem).not.toHaveBeenCalled();
  });

  test("writes only the first user event when no key exists and reloads it through a new repository", () => {
    const event = createSavedEvent();
    const repository = createLocalEventRepository(storage, now);

    const initial = repository.list();
    expect(initial.events.map((item) => item.id)).toEqual(seedIds);
    expect(initial.storageIssue).toBeNull();
    expect(initial.invalidCount).toBe(0);

    repository.add(event);

    expect(JSON.parse(storage.getItem(savedEventsStorageKey) ?? "null")).toEqual([event]);
    expect(
      createLocalEventRepository(storage, now)
        .list()
        .events.map((item) => item.id),
    ).toEqual([...seedIds, event.id]);
  });

  test("appends without discarding invalid neighbors, history, or unknown stored fields", () => {
    const historical = { ...createSavedEvent(), extra: "keep this" };
    const invalid = { id: "broken", title: 42 };
    const nextEvent = createSavedEvent({ id: "user:550e8400-e29b-41d4-a716-446655440001" });
    storage.setItem(savedEventsStorageKey, JSON.stringify([invalid, historical]));

    createLocalEventRepository(storage, now).add(nextEvent);

    expect(JSON.parse(storage.getItem(savedEventsStorageKey) ?? "null")).toEqual([
      invalid,
      historical,
      nextEvent,
    ]);
  });

  test("preserves history and seed priority, reports invalid neighbors, and retains the first valid local ID", () => {
    const historical = createSavedEvent();
    const raw = JSON.stringify([
      null,
      { ...historical, title: "" },
      historical,
      { ...historical, title: "Duplicate" },
      createSavedEvent({ id: "mock-1" }),
    ]);
    storage.setItem(savedEventsStorageKey, raw);

    const result = createLocalEventRepository(storage, now).list();

    expect(result.events.map((event) => event.id)).toEqual([...seedIds, historical.id]);
    expect(result.events.find((event) => event.id === "mock-1")).toEqual(createSeedEvents(now)[0]);
    expect(result.events.at(-1)).toEqual(historical);
    expect(result.invalidCount).toBe(4);
    expect(result.storageIssue).toBeNull();
    expect(storage.getItem(savedEventsStorageKey)).toBe(raw);
  });

  test.each(["seed", "valid local", "invalid local"])(
    "rejects an ID used by a %s record without writing",
    (kind) => {
      const event = createSavedEvent({ id: kind === "seed" ? "mock-1" : createSavedEvent().id });
      const raw = JSON.stringify(
        kind === "seed" ? [] : [{ ...event, title: kind === "invalid local" ? "" : event.title }],
      );
      storage.setItem(savedEventsStorageKey, raw);
      const setItem = jest.spyOn(storage, "setItem");

      expect(() => createLocalEventRepository(storage, now).add(event)).toThrow();
      expect(setItem).not.toHaveBeenCalled();
      expect(storage.getItem(savedEventsStorageKey)).toBe(raw);
    },
  );

  test("validates additions before writing", () => {
    const setItem = jest.spyOn(storage, "setItem");

    expect(() =>
      createLocalEventRepository(storage, now).add(
        createSavedEvent({ sourceUrl: "javascript:alert(1)" }),
      ),
    ).toThrow();
    expect(setItem).not.toHaveBeenCalled();
    expect(storage.getItem(savedEventsStorageKey)).toBeNull();
  });

  test("propagates write failures and never reports an unsaved addition", () => {
    const error = new Error("Storage quota exceeded");
    jest.spyOn(storage, "setItem").mockImplementation(() => {
      throw error;
    });
    const repository = createLocalEventRepository(storage, now);

    expect(() => repository.add(createSavedEvent())).toThrow(error);
    expect(repository.list().events.map((event) => event.id)).toEqual(seedIds);
    expect(storage.getItem(savedEventsStorageKey)).toBeNull();
  });

  test("cleanup preserves valid history and its original fields, removes duplicates, and isolates its key", () => {
    const historical = { ...createSavedEvent(), extra: "keep this" };
    storage.setItem(
      savedEventsStorageKey,
      JSON.stringify([null, historical, historical, createSavedEvent({ id: "mock-1" })]),
    );
    storage.setItem("other-app", "untouched");
    const repository = createLocalEventRepository(storage, now);

    repository.removeInvalid();

    expect(JSON.parse(storage.getItem(savedEventsStorageKey) ?? "null")).toEqual([historical]);
    expect(storage.getItem("other-app")).toBe("untouched");
    expect(repository.list().invalidCount).toBe(0);
    expect(repository.list().events.map((event) => event.id)).toEqual([...seedIds, historical.id]);
  });

  test("propagates cleanup write failures without changing history", () => {
    const raw = JSON.stringify([null, createSavedEvent()]);
    storage.setItem(savedEventsStorageKey, raw);
    const error = new Error("Storage quota exceeded");
    jest.spyOn(storage, "setItem").mockImplementation(() => {
      throw error;
    });

    expect(() => createLocalEventRepository(storage, now).removeInvalid()).toThrow(error);
    expect(storage.getItem(savedEventsStorageKey)).toBe(raw);
  });

  test("reset removes only saved events including history and leaves seeds and other keys available", () => {
    storage.setItem(savedEventsStorageKey, JSON.stringify([createSavedEvent()]));
    storage.setItem("other-app", "untouched");
    const repository = createLocalEventRepository(storage, now);

    repository.resetSaved();

    expect(storage.getItem(savedEventsStorageKey)).toBeNull();
    expect(storage.getItem("other-app")).toBe("untouched");
    expect(repository.list().events.map((event) => event.id)).toEqual(seedIds);
  });

  test("propagates reset failures", () => {
    const raw = JSON.stringify([createSavedEvent()]);
    storage.setItem(savedEventsStorageKey, raw);
    const error = new Error("Storage access denied");
    jest.spyOn(storage, "removeItem").mockImplementation(() => {
      throw error;
    });

    expect(() => createLocalEventRepository(storage, now).resetSaved()).toThrow(error);
    expect(storage.getItem(savedEventsStorageKey)).toBe(raw);
  });
});

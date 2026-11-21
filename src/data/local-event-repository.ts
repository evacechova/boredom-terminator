import type { EventListResult, EventRepository } from "@/core/events/event-repository";
import type { MapEvent } from "@/core/events/types";
import { storedEventSchema } from "@/core/events/stored-event-schema";
import { createSeedEvents } from "./seed-events";

export const savedEventsStorageKey = "boredom-terminator:saved-events:v1";

const parseSavedItems = (raw: string | null): unknown[] => {
  if (raw === null) {
    return [];
  }

  const parsed: unknown = JSON.parse(raw);
  if (!Array.isArray(parsed)) {
    throw new Error("Saved events must be a JSON array. Reset is required to replace this data.");
  }

  return parsed;
};

const selectValidEvents = (
  items: unknown[],
  seedIds: Set<string>,
): { events: MapEvent[]; savedItems: unknown[] } => {
  const seenIds = new Set(seedIds);
  const events: MapEvent[] = [];
  const savedItems: unknown[] = [];

  for (const item of items) {
    const result = storedEventSchema.safeParse(item);
    if (!result.success || seenIds.has(result.data.id)) {
      continue;
    }

    seenIds.add(result.data.id);
    events.push(result.data);
    // Cleanup removes invalid records, but preserves the original valid records and their fields.
    savedItems.push(item);
  }

  return { events, savedItems };
};

export const createLocalEventRepository = (storage: Storage, now: Date): EventRepository => {
  const seedTime = new Date(now.getTime());
  const seedIds = new Set(createSeedEvents(seedTime).map((event) => event.id));
  const readSavedItems = () => parseSavedItems(storage.getItem(savedEventsStorageKey));

  return {
    list(): EventListResult {
      const seeds = createSeedEvents(seedTime);
      let raw: string | null;

      try {
        raw = storage.getItem(savedEventsStorageKey);
      } catch {
        return { events: seeds, invalidCount: 0, storageIssue: "read_error" };
      }

      let items: unknown[];
      try {
        items = parseSavedItems(raw);
      } catch {
        return { events: seeds, invalidCount: 0, storageIssue: "invalid_format" };
      }

      const { events } = selectValidEvents(items, seedIds);
      return {
        events: [...seeds, ...events],
        invalidCount: items.length - events.length,
        storageIssue: null,
      };
    },

    add(event: MapEvent): void {
      const validEvent = storedEventSchema.parse(event);
      const items = readSavedItems();
      const hasLocalId = items.some(
        (item) =>
          typeof item === "object" && item !== null && "id" in item && item.id === validEvent.id,
      );

      if (seedIds.has(validEvent.id) || hasLocalId) {
        throw new Error("An event with this ID already exists.");
      }

      storage.setItem(savedEventsStorageKey, JSON.stringify([...items, validEvent]));
    },

    removeInvalid(): void {
      const items = readSavedItems();
      const { savedItems } = selectValidEvents(items, seedIds);
      if (savedItems.length === items.length) {
        return;
      }

      storage.setItem(savedEventsStorageKey, JSON.stringify(savedItems));
    },

    resetSaved(): void {
      storage.removeItem(savedEventsStorageKey);
    },
  };
};

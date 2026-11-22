import { z } from "zod";
import type { EventRepository } from "@/core/events/event-repository";
import type { MapEvent } from "@/core/events/types";
import { storedEventSchema } from "@/core/events/stored-event-schema";
import { createSeedEvents } from "./seed-events";

export const savedEventsStorageKey = "boredom-terminator:saved-events:v1";

const savedEventsSchema = z.array(storedEventSchema);

export const createLocalEventRepository = (storage: Storage, now: Date): EventRepository => {
  const seedTime = new Date(now.getTime());

  return {
    list(): MapEvent[] {
      const seeds = createSeedEvents(seedTime);

      try {
        const raw = storage.getItem(savedEventsStorageKey);
        if (raw === null) {
          return seeds;
        }

        const parsed: unknown = JSON.parse(raw);
        const savedEvents = savedEventsSchema.parse(parsed);
        const events = [...seeds, ...savedEvents];
        const ids = new Set(events.map((event) => event.id));

        return ids.size === events.length ? events : seeds;
      } catch {
        return seeds;
      }
    },

    resetSaved(): void {
      storage.removeItem(savedEventsStorageKey);
    },
  };
};

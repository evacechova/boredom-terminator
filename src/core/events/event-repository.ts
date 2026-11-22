import type { MapEvent } from "./types";

export type EventRepository = {
  list(): MapEvent[];
  resetSaved(): void;
};

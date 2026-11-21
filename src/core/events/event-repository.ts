import type { MapEvent } from "./types";

export type EventListResult = {
  events: MapEvent[];
  invalidCount: number;
  storageIssue: null | "invalid_format" | "read_error";
};

export type EventRepository = {
  list(): EventListResult;
  add(event: MapEvent): void;
  removeInvalid(): void;
  resetSaved(): void;
};

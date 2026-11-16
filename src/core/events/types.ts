export type EventCategory =
  | "random_play_dance"
  | "cover_shoot"
  | "dance_class"
  | "festival"
  | "party"
  | "fan_event"
  | "concert"
  | "store_event";

export type MapEvent = {
  id: string;
  title: string;
  category: EventCategory;
  location: {
    city: "Praha";
    latitude: number;
    longitude: number;
  };
  startsAt: string;
  endsAt?: string;
  description?: string;
  sourceUrl?: string;
  venueName?: string;
  createdAt: string;
};

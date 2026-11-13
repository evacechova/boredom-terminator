export type MapEvent = {
  id: string;
  title: string;
  location: {
    latitude: number;
    longitude: number;
  };
  startsAt: string;
  description?: string;
  venueName?: string;
};

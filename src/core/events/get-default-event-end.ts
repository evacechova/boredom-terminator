const defaultEventDurationMs = 2 * 60 * 60 * 1000;

export const getDefaultEventEnd = (startsAt: string): string => {
  const startsAtMs = new Date(startsAt).getTime();
  return new Date(startsAtMs + defaultEventDurationMs).toISOString();
};

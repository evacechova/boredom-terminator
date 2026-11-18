const dateFormatter = new Intl.DateTimeFormat("cs-CZ", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Europe/Prague",
});

export const formatEventDate = (isoDate: string): string => {
  return dateFormatter.format(new Date(isoDate));
};

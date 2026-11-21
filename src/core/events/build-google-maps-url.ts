export type BuildGoogleMapsUrlResult =
  { ok: true; value: string } | { ok: false; error: "invalid_coordinates" };

export const buildGoogleMapsUrl = (
  latitude: number,
  longitude: number,
): BuildGoogleMapsUrlResult => {
  const isValidLatitude = Number.isFinite(latitude) && Math.abs(latitude) <= 90;
  const isValidLongitude = Number.isFinite(longitude) && Math.abs(longitude) <= 180;

  if (!isValidLatitude || !isValidLongitude) {
    return { ok: false, error: "invalid_coordinates" };
  }

  const coordinates = encodeURIComponent(`${latitude},${longitude}`);

  return {
    ok: true,
    value: `https://www.google.com/maps/dir/?api=1&destination=${coordinates}&dir_action=navigate`,
  };
};

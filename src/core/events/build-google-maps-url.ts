export const buildGoogleMapsUrl = (latitude: number, longitude: number): string | undefined => {
  const isValidLatitude = Number.isFinite(latitude) && Math.abs(latitude) <= 90;
  const isValidLongitude = Number.isFinite(longitude) && Math.abs(longitude) <= 180;

  if (!isValidLatitude || !isValidLongitude) {
    return undefined;
  }

  const coordinates = encodeURIComponent(`${latitude},${longitude}`);

  return `https://www.google.com/maps/dir/?api=1&destination=${coordinates}&dir_action=navigate`;
};

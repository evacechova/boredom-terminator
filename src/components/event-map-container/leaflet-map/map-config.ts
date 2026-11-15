export const mapCenter: [number, number] = [50.0755, 14.4378];
export const mapZoom = 13;

export const tileLayerConfig = {
  url: `https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png?key=${process.env.NEXT_PUBLIC_CARTO_API_KEY}`,
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  subdomains: "abcd",
  maxZoom: 20,
};

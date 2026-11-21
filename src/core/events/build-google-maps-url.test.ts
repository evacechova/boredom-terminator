import { buildGoogleMapsUrl } from "./build-google-maps-url";

describe("buildGoogleMapsUrl", () => {
  it("builds a navigation URL to the exact encoded destination", () => {
    expect(buildGoogleMapsUrl(50.0755, 14.4378)).toEqual({
      ok: true,
      value:
        "https://www.google.com/maps/dir/?api=1&destination=50.0755%2C14.4378&dir_action=navigate",
    });
  });

  it.each([
    [90.001, 14.4378],
    [50.0755, -180.001],
    [NaN, 14.4378],
    [50.0755, Infinity],
  ])("rejects invalid coordinates %s, %s", (latitude, longitude) => {
    expect(buildGoogleMapsUrl(latitude, longitude)).toEqual({
      ok: false,
      error: "invalid_coordinates",
    });
  });
});

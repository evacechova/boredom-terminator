import { fireEvent, render, screen } from "@testing-library/react";
import LeafletMap from "./LeafletMap";
import type { MapEvent } from "@/domain/events/types";

// Replace only the React Leaflet boundary; use real Leaflet marker instances.
jest.mock("react-leaflet", () => {
  const React = jest.requireActual<typeof import("react")>("react");
  const Leaflet = jest.requireActual<typeof import("leaflet")>("leaflet");
  type MarkerProps = import("react-leaflet").MarkerProps & {
    ref?: import("react").Ref<import("leaflet").Marker>;
  };
  return {
    MapContainer: ({ children }: { children: import("react").ReactNode }) => <div>{children}</div>,
    TileLayer: () => null,
    useMapEvents: () => undefined,
    Marker: ({ ref, title, eventHandlers, zIndexOffset }: MarkerProps) => {
      const [marker] = React.useState(() => Leaflet.marker([50, 14]));
      return (
        <div
          role="button"
          tabIndex={0}
          title={title}
          data-z-index={zIndexOffset}
          ref={(element) => {
            const getElement = jest
              .spyOn(marker, "getElement")
              .mockReturnValue(element ?? undefined);
            marker.off();
            if (eventHandlers) {
              marker.on(eventHandlers);
            }
            if (typeof ref === "function") {
              ref(element ? marker : null);
            }
            return () => getElement.mockRestore();
          }}
          onClick={(event) => marker.fire("click", { originalEvent: event.nativeEvent })}
          onKeyDown={(event) => marker.fire("keydown", { originalEvent: event.nativeEvent })}
        />
      );
    },
  };
});

const events: MapEvent[] = [
  {
    id: "first",
    title: "First",
    startsAt: "2026-11-05T18:00:00Z",
    location: { latitude: 50, longitude: 14 },
  },
  {
    id: "second",
    title: "Second",
    startsAt: "2026-11-05T18:00:00Z",
    location: { latitude: 51, longitude: 15 },
  },
];

it("passes the clicked marker element and event ID to the parent", () => {
  const onEventSelect = jest.fn();
  render(
    <LeafletMap
      events={events}
      selectedEventId={null}
      onEventSelect={onEventSelect}
      onMapClick={() => {}}
    />,
  );
  const marker = screen.getByTitle("Second");
  fireEvent.click(marker);
  expect(onEventSelect).toHaveBeenCalledTimes(1);
  expect(onEventSelect).toHaveBeenCalledWith("second", marker);
});

it("activates once for Enter and ignores repeats and other keys", () => {
  const onEventSelect = jest.fn();
  render(
    <LeafletMap
      events={events}
      selectedEventId={null}
      onEventSelect={onEventSelect}
      onMapClick={() => {}}
    />,
  );
  const marker = screen.getByTitle("First");
  marker.focus();
  fireEvent.keyDown(marker, { key: "Enter" });
  fireEvent.keyDown(marker, { key: "Enter", repeat: true });
  fireEvent.keyDown(marker, { key: "Escape" });
  expect(onEventSelect).toHaveBeenCalledTimes(1);
  expect(onEventSelect).toHaveBeenCalledWith("first", marker);
});

it("moves selection styling and z-index to the newly selected marker", () => {
  const props = { events, onEventSelect: jest.fn(), onMapClick: jest.fn() };
  const { rerender } = render(<LeafletMap {...props} selectedEventId="first" />);
  expect(screen.getByTitle("First")).toHaveClass("event-marker-selected");
  expect(screen.getByTitle("First")).toHaveAttribute("data-z-index", "1000");
  rerender(<LeafletMap {...props} selectedEventId="second" />);
  expect(screen.getByTitle("First")).not.toHaveClass("event-marker-selected");
  expect(screen.getByTitle("First")).toHaveAttribute("data-z-index", "0");
  expect(screen.getByTitle("Second")).toHaveClass("event-marker-selected");
  expect(screen.getByTitle("Second")).toHaveAttribute("data-z-index", "1000");
});

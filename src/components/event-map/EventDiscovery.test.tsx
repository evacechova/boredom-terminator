import { fireEvent, render, screen } from "@testing-library/react";
import { EventDiscovery } from "./EventDiscovery";
import type { MapEvent } from "@/domain/events/types";

jest.mock("next/dynamic", () => ({
  __esModule: true,
  default: () => {
    const React = jest.requireActual<typeof import("react")>("react");
    return function MockMap({
      onEventSelect,
      onMapClick,
    }: {
      onEventSelect: (id: string, element: HTMLElement | null) => void;
      onMapClick: () => void;
    }) {
      const [visible, setVisible] = React.useState(true);
      return (
        <>
          {visible && (
            <button onClick={(event) => onEventSelect("event-1", event.currentTarget)}>
              Select event
            </button>
          )}
          <button onClick={(event) => onEventSelect("event-2", event.currentTarget)}>
            Select second
          </button>
          <button onClick={onMapClick}>Empty map</button>
          <button onClick={() => setVisible(false)}>Remove marker</button>
        </>
      );
    };
  },
}));

it("hides event creation while a detail is open and restores it on close", () => {
  const events: MapEvent[] = [
    {
      id: "event-1",
      title: "Concert",
      startsAt: "2026-11-05T18:00:00Z",
      location: { latitude: 50.08, longitude: 14.42 },
    },
  ];

  render(
    <EventDiscovery events={events}>
      <a href="/events/new">Add event</a>
    </EventDiscovery>,
  );

  expect(screen.getByRole("link", { name: "Add event" })).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Select event" }));
  expect(screen.queryByRole("link", { name: "Add event" })).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Zavřít" }));
  expect(screen.getByRole("link", { name: "Add event" })).toBeInTheDocument();
});

it("returns focus to the opening marker after Escape", () => {
  render(
    <EventDiscovery
      events={[
        {
          id: "event-1",
          title: "Concert",
          startsAt: "2026-11-05T18:00:00Z",
          location: { latitude: 50.08, longitude: 14.42 },
        },
      ]}
    />,
  );
  const marker = screen.getByRole("button", { name: "Select event" });
  fireEvent.click(marker);
  expect(screen.getByRole("heading", { name: "Concert" })).toHaveFocus();
  fireEvent.keyDown(window, { key: "Escape" });
  expect(screen.queryByRole("heading", { name: "Concert" })).not.toBeInTheDocument();
  expect(marker).toHaveFocus();
});

const focusEvents: MapEvent[] = [
  {
    id: "event-1",
    title: "Concert",
    startsAt: "2026-11-05T18:00:00Z",
    location: { latitude: 50, longitude: 14 },
  },
  {
    id: "event-2",
    title: "Dance",
    startsAt: "2026-11-05T18:00:00Z",
    location: { latitude: 51, longitude: 15 },
  },
];

it("returns focus to the latest selected marker when the panel closes", () => {
  render(<EventDiscovery events={focusEvents} />);
  fireEvent.click(screen.getByRole("button", { name: "Select event" }));
  const second = screen.getByRole("button", { name: "Select second" });
  fireEvent.click(second);
  expect(screen.getByRole("heading", { name: "Dance" })).toHaveFocus();
  fireEvent.click(screen.getByRole("button", { name: "Zavřít" }));
  expect(second).toHaveFocus();
});

it("does not move focus back to a marker when the map closes the panel", () => {
  render(<EventDiscovery events={focusEvents} />);
  fireEvent.click(screen.getByRole("button", { name: "Select event" }));
  const map = screen.getByRole("button", { name: "Empty map" });
  map.focus();
  fireEvent.click(map);
  expect(screen.queryByRole("heading")).not.toBeInTheDocument();
  expect(map).toHaveFocus();
});

it("skips focus restoration when the opening marker has left the DOM", () => {
  render(<EventDiscovery events={focusEvents} />);
  const marker = screen.getByRole("button", { name: "Select event" });
  fireEvent.click(marker);
  const focus = jest.spyOn(marker, "focus");
  fireEvent.click(screen.getByRole("button", { name: "Remove marker" }));
  expect(marker.isConnected).toBe(false);
  fireEvent.keyDown(window, { key: "Escape" });
  expect(screen.queryByRole("heading")).not.toBeInTheDocument();
  expect(focus).not.toHaveBeenCalled();
});

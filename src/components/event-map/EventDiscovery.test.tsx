import { fireEvent, render, screen } from "@testing-library/react";
import { EventDiscovery } from "./EventDiscovery";
import type { MapEvent } from "@/domain/events/types";

jest.mock("next/dynamic", () => ({
  __esModule: true,
  default: () =>
    function MockMap({ onEventSelect }: { onEventSelect: (id: string) => void }) {
      return <button onClick={() => onEventSelect("event-1")}>Select event</button>;
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

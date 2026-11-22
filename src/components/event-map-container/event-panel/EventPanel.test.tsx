import { fireEvent, render, screen } from "@testing-library/react";
import { EventPanel } from "./EventPanel";
import type { MapEvent } from "@/core/events/types";

describe("EventPanel", () => {
  const testEvent: MapEvent = {
    id: "1",
    title: "Test concert",
    category: "concert",
    createdAt: "2026-11-01T12:00:00Z",
    location: {
      city: "Praha",
      latitude: 50.08,
      longitude: 14.42,
    },
    startsAt: "2026-11-05T18:00:00Z",
  };

  it("shows the venue, description and start time in Prague time", () => {
    const event: MapEvent = {
      ...testEvent,
      startsAt: "2026-11-07T14:00:00Z",
      venueName: "Letenské sady",
      description: "An informal K-pop dance meetup.",
    };

    render(<EventPanel event={event} onClose={jest.fn()} />);

    expect(screen.getByText("Letenské sady")).toBeInTheDocument();
    const venueLink = screen.getByRole("link", { name: "Navigovat" });
    expect(venueLink).toHaveAttribute(
      "href",
      "https://www.google.com/maps/dir/?api=1&destination=50.08%2C14.42&dir_action=navigate",
    );
    expect(venueLink).toHaveAttribute("target", "_blank");
    expect(venueLink).toHaveAttribute("rel", "noopener noreferrer");
    expect(screen.getByText("An informal K-pop dance meetup.")).toBeInTheDocument();
    const time = screen.getByText("7. 11. 2026 15:00");
    expect(time.tagName).toBe("TIME");
    expect(time).toHaveAttribute("datetime", "2026-11-07T14:00:00Z");
  });

  it("shows navigation even when the venue name is missing", () => {
    render(<EventPanel event={testEvent} onClose={jest.fn()} />);

    expect(screen.getByRole("link", { name: "Navigovat" })).toBeInTheDocument();
  });

  it("keeps event details but hides invalid navigation", () => {
    const event: MapEvent = {
      ...testEvent,
      venueName: "Letenské sady",
      description: "An informal K-pop dance meetup.",
      location: { ...testEvent.location, latitude: NaN },
    };

    render(<EventPanel event={event} onClose={jest.fn()} />);

    expect(screen.queryByRole("link", { name: "Navigovat" })).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { name: event.title })).toBeInTheDocument();
    expect(screen.getByText("Letenské sady")).toBeInTheDocument();
    expect(screen.getByText("An informal K-pop dance meetup.")).toBeInTheDocument();
  });

  it("updates the content and focuses the heading when the selected event changes", () => {
    const firstEvent: MapEvent = {
      ...testEvent,
      venueName: "Letenské sady",
      description: "An informal K-pop dance meetup.",
    };
    const nextEvent: MapEvent = {
      ...testEvent,
      id: "2",
      title: "Cover practice",
      startsAt: "2026-11-08T13:00:00Z",
    };
    const onClose = jest.fn();
    const { rerender } = render(<EventPanel event={firstEvent} onClose={onClose} />);

    expect(screen.getByText("Letenské sady")).toBeInTheDocument();
    expect(screen.getByText("An informal K-pop dance meetup.")).toBeInTheDocument();
    screen.getByRole("button", { name: "Zavřít" }).focus();

    rerender(<EventPanel event={nextEvent} onClose={onClose} />);

    expect(screen.getByRole("heading", { name: "Cover practice" })).toHaveFocus();
    expect(screen.queryByRole("heading", { name: firstEvent.title })).not.toBeInTheDocument();
    expect(screen.queryByText("Letenské sady")).not.toBeInTheDocument();
    expect(screen.queryByText("An informal K-pop dance meetup.")).not.toBeInTheDocument();
    expect(screen.queryByText("5. 11. 2026 19:00")).not.toBeInTheDocument();
    expect(screen.getByText("8. 11. 2026 14:00")).toHaveAttribute("datetime", nextEvent.startsAt);
    expect(onClose).not.toHaveBeenCalled();
  });

  it("calls onClose only when Escape is pressed", () => {
    const onClose = jest.fn();
    render(<EventPanel event={testEvent} onClose={onClose} />);

    fireEvent.keyDown(window, { key: "Backspace" });
    expect(onClose).not.toHaveBeenCalled();
    fireEvent.keyDown(window, { key: "Escape" });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("removes the Escape listener when the panel unmounts", () => {
    const onClose = jest.fn();
    const { unmount } = render(<EventPanel event={testEvent} onClose={onClose} />);

    unmount();
    fireEvent.keyDown(window, { key: "Escape" });

    expect(onClose).not.toHaveBeenCalled();
  });

  it("uses the latest close callback without keeping the previous listener", () => {
    const previousOnClose = jest.fn();
    const onClose = jest.fn();
    const { rerender } = render(<EventPanel event={testEvent} onClose={previousOnClose} />);

    rerender(<EventPanel event={testEvent} onClose={onClose} />);
    fireEvent.keyDown(window, { key: "Escape" });

    expect(previousOnClose).not.toHaveBeenCalled();
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

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
    expect(venueLink).toHaveAttribute("rel", "noopener noreferrer");
    expect(screen.getByText("An informal K-pop dance meetup.")).toBeInTheDocument();
    const time = screen.getByText("7. 11. 2026 15:00");
    expect(time.tagName).toBe("TIME");
    expect(time).toHaveAttribute("datetime", "2026-11-07T14:00:00Z");
  });

  it("opens navigation in a new tab only at desktop widths, including after resizing", () => {
    const originalMatchMedia = window.matchMedia;
    const mediaQuery = {
      matches: true,
      media: "(min-width: 640px)",
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    };
    window.matchMedia = jest.fn().mockReturnValue(mediaQuery);

    try {
      render(
        <EventPanel event={{ ...testEvent, venueName: "Letenské sady" }} onClose={jest.fn()} />,
      );
      const venueLink = screen.getByRole("link", { name: "Navigovat" });
      venueLink.addEventListener("click", (clickEvent) => clickEvent.preventDefault());

      fireEvent.click(venueLink);
      expect(venueLink).toHaveAttribute("target", "_blank");

      window.matchMedia = jest.fn().mockReturnValue({ ...mediaQuery, matches: false });
      fireEvent.click(venueLink);
      expect(venueLink).toHaveAttribute("target", "_self");
    } finally {
      window.matchMedia = originalMatchMedia;
    }
  });

  it("shows navigation even when the venue name is missing", () => {
    render(<EventPanel event={testEvent} onClose={jest.fn()} />);

    expect(screen.getByRole("heading", { name: testEvent.title })).toBeInTheDocument();
    expect(screen.getByText("5. 11. 2026 19:00")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Navigovat" })).toHaveAttribute(
      "href",
      "https://www.google.com/maps/dir/?api=1&destination=50.08%2C14.42&dir_action=navigate",
    );
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

  it("closes through the named icon button", () => {
    const onClose = jest.fn();
    render(<EventPanel event={testEvent} onClose={onClose} />);

    fireEvent.click(screen.getByRole("button", { name: "Zavřít" }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when Escape is pressed", () => {
    const mockOnClose = jest.fn();

    render(<EventPanel event={testEvent} onClose={mockOnClose} />);

    fireEvent.keyDown(window, { key: "Escape" });

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
  it("does not call onClose when Backspace is pressed", () => {
    const mockOnClose = jest.fn();

    render(<EventPanel event={testEvent} onClose={mockOnClose} />);

    fireEvent.keyDown(window, { key: "Backspace" });

    expect(mockOnClose).not.toHaveBeenCalled();
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

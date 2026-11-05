import { fireEvent, render, screen } from "@testing-library/react";
import { EventPanel } from "./EventPanel";
import type { MapEvent } from "@/domain/events/types";

describe("EventPanel", () => {
  const testEvent: MapEvent = {
    id: "1",
    title: "Test concert",
    location: {
      latitude: 50.08,
      longitude: 14.42,
    },
    startsAt: "2026-11-05T18:00:00Z",
  };

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
});

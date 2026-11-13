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

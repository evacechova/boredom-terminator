import { render, screen } from "@testing-library/react";
import Home from "./page";
import type { ReactNode } from "react";

jest.mock("@/components/event-map/EventDiscovery", () => {
  return { EventDiscovery: ({ children }: { children: ReactNode }) => children };
});

describe("Homepage", () => {
  beforeEach(() => {
    render(<Home />);
  });
  it("renders the application heading", () => {
    expect(screen.getByRole("heading", { name: "Boredom Terminator" })).toBeInTheDocument();
  });
  it("renders the application logo", () => {
    expect(screen.getByRole("img", { name: "Boredom Terminator robot cat" })).toBeInTheDocument();
  });
  it("renders link to add an event", () => {
    expect(screen.getByRole("link", { name: "Add event" })).toHaveAttribute("href", "/events/new");
  });
  it("keeps event creation enabled", () => {
    const addEvent = screen.getByRole("link", { name: "Add event" });

    expect(addEvent).not.toHaveAttribute("aria-disabled");
    expect(addEvent).not.toHaveAttribute("inert");
    expect(addEvent).not.toHaveAttribute("tabindex", "-1");
  });
});

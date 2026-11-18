import { render, screen } from "@testing-library/react";
import Home from "./page";

jest.mock("@/components/event-map-container/EventMapContainer", () => {
  return { EventMapContainer: () => null };
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
});

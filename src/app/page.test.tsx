import { render, screen } from "@testing-library/react";
import Home from "./page";

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
});

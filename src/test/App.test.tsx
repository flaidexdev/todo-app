import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";

describe("<App />", () => {
  it("renders without crashing", () => {
    render(<App />);
    expect(screen.getByTestId("todo-app-header")).toBeInTheDocument();
  });

  it("displays the header", () => {
    render(<App />);
    const headerElement = screen.getByTestId("todo-app-header");
    expect(headerElement).toBeInTheDocument();
  });

  it("renders the TodoDashboard component", () => {
    render(<App />);
    const dashboardElement = screen.getByTestId("todo-dashboard");
    expect(dashboardElement).toBeInTheDocument();
  });
});

import React from "react";
import { render } from "@testing-library/react";
import TodoDashboard from "../components/TodoDashboard";


// Mock child components
jest.mock("../components/todo/TodoList", () => {
  return {
    __esModule: true,
    default: jest.fn(() => <div data-testid="mocked-todolist" />),
  };
});

jest.mock("../components/Sidebar", () => {
  return {
    __esModule: true,
    default: jest.fn(() => <div data-testid="mocked-sidebar" />),
  };
});


// Mocking localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
  removeItem: jest.fn(),
};

Object.defineProperty(window, "localStorage", {
  value: mockLocalStorage,
});

describe("<TodoDashboard />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (localStorage.getItem as jest.Mock).mockReturnValueOnce(
      JSON.stringify([
        { id: 1, text: "Work task", done: false, category: "Work" },
        { id: 2, text: "Home task", done: true, category: "Home" },
        { id: 3, text: "Personal task", done: false, category: "Personal" },
      ])
    );
  });

  it("renders without crashing", () => {
    render(<TodoDashboard />);
  });

  it("reads todoData and categories from localStorage on mount", () => {
    render(<TodoDashboard />);

    expect(localStorage.getItem).toHaveBeenCalledWith("TodoData");
    expect(localStorage.getItem).toHaveBeenCalledWith("CategoryData");
  });
});

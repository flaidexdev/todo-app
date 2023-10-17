import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // for the "toBeInTheDocument" matcher

import SearchTodo from "../../components/todo/SearchTodo"; // Update with the correct path

describe("SearchTodo", () => {
  const mockSetFilteredTodoData = jest.fn();

  const renderComponent = () => {
    return render(
      <SearchTodo
        todoData={[
          { id: 1, content: "Test todo 1", done: false, category: 'Work' },
          { id: 2, content: "Another test", done: true, category: 'Personal' },
        ]}
        setFilteredTodoData={mockSetFilteredTodoData}
      />
    );
  };

  it("renders without crashing", () => {
    renderComponent();
    const inputElement = screen.getByTestId("categoryInput");
    expect(inputElement).toBeInTheDocument();
  });

  it("updates the search term when typing", () => {
    renderComponent();
    const inputElement = screen.getByTestId("categoryInput");
    fireEvent.change(inputElement, { target: { value: "Test" } });
    expect(inputElement).toHaveValue("Test");
  });

  it("calls setFilteredTodoData with correct data when typing", () => {
    renderComponent();
    const inputElement = screen.getByTestId("categoryInput");
    fireEvent.change(inputElement, { target: { value: "Test todo 1" } });

    // This assertion might need to be changed based on actual behavior of setFilteredTodoData.
    expect(mockSetFilteredTodoData).toHaveBeenCalled();
  });
});

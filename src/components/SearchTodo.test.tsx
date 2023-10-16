import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchTodo from "./SearchTodo";
import { Todo } from "../types";

describe("<SearchTodo />", () => {
  const mockTodoData: Todo[] = [
    { id: 1, category: "Home", done: false, content: "Learn React" },
    { id: 2, category: "Work", done: true, content: "Buy Groceries" },
  ];

  it("should render without crashing", () => {
    render(
      <SearchTodo todoData={mockTodoData} setFilteredTodoData={jest.fn()} />
    );
    const inputElement = screen.getByPlaceholderText("Search Todo...");
    expect(inputElement).toBeInTheDocument();
  });

  it("should filter todo items based on search term", () => {
    const setFilteredTodoData = jest.fn();
    render(
      <SearchTodo
        todoData={mockTodoData}
        setFilteredTodoData={setFilteredTodoData}
      />
    );

    const inputElement = screen.getByPlaceholderText("Search Todo...");
    fireEvent.change(inputElement, { target: { value: "React" } });

    expect(setFilteredTodoData).toHaveBeenCalledWith(expect.any(Function));
  });

  it("should reset filtered todo items when search term is empty", () => {
    const setFilteredTodoData = jest.fn();
    render(
      <SearchTodo
        todoData={mockTodoData}
        setFilteredTodoData={setFilteredTodoData}
      />
    );

    const inputElement = screen.getByPlaceholderText("Search Todo...");
    fireEvent.change(inputElement, { target: { value: "React" } });
    fireEvent.change(inputElement, { target: { value: "" } });

    expect(setFilteredTodoData).toHaveBeenLastCalledWith(expect.any(Function));
  });
});

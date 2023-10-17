import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import TodoCard from "../../components/card/Todo";

describe("<TodoCard />", () => {
  const mockTodo = {
    id: 1,
    content: "Test todo",
    category: "Work",
    done: false,
  };

  it("renders without crashing", () => {
    render(<TodoCard todo={mockTodo} todoData={[]} setTodoData={jest.fn()} />);
  });

  it("displays the todo content", () => {
    render(<TodoCard todo={mockTodo} todoData={[]} setTodoData={jest.fn()} />);
    expect(screen.getByText("Test todo")).toBeInTheDocument();
  });

  it("toggles done status when the complete icon is clicked", () => {
    const setTodoData = jest.fn();
    render(
      <TodoCard
        todo={mockTodo}
        todoData={[mockTodo]}
        setTodoData={setTodoData}
      />
    );

    fireEvent.click(screen.getByTestId("complete"));
    expect(setTodoData).toHaveBeenCalled();
  });

  it("copies to clipboard when the copy icon is clicked", () => {
    // Mocking clipboard functionality
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn(),
      },
    });
    render(
      <TodoCard todo={mockTodo} todoData={[mockTodo]} setTodoData={jest.fn()} />
    );

    fireEvent.click(screen.getByTestId("copy"));
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      mockTodo.content
    );
  });

  it("removes todo when the remove icon is clicked", () => {
    const setTodoData = jest.fn();
    render(
      <TodoCard
        todo={mockTodo}
        todoData={[mockTodo]}
        setTodoData={setTodoData}
      />
    );

    fireEvent.click(screen.getByTestId("remove"));
    expect(setTodoData).toHaveBeenCalled();
  });
});

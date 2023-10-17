import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import TodoList from '../../components/todo/TodoList';

describe('TodoList Component', () => {
  test('displays todoData when provided', () => {
    const mockTodoData = [
      {
        id: 1,
        content: "Test Todo 1",
        category: "Work",
        done: false
      }
    ];

    render(
      <TodoList
        categories={["Work", "Home"]}
        todoData={mockTodoData}
        setTodoData={jest.fn()}
        filteredTodoData={mockTodoData}
        setFilteredTodoData={jest.fn()}
        setMenu={jest.fn()}
      />
    );

    expect(screen.getByText("Test Todo 1")).toBeInTheDocument();
  });

  test('displays "No Todo Found" when no todoData are provided', () => {
    render(
      <TodoList
        categories={[]}
        todoData={[]}
        setTodoData={jest.fn()}
        filteredTodoData={[]}
        setFilteredTodoData={jest.fn()}
        setMenu={jest.fn()}
      />
    );

    expect(screen.getByText("No Todo Found.")).toBeInTheDocument();
  });
});

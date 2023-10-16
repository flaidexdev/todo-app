import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// This is a mock for the TodoList component, so we can test the App component in isolation.
jest.mock('./components/TodoList', () => {
  return function DummyTodoList() {
    return <div data-testid="todo-list">TodoList</div>;
  };
});

describe('<App />', () => {
  test('renders without crashing', () => {
    render(<App />);
    // Check for the presence of the header
    const headerElement = screen.getByText(/todo app/i);
    expect(headerElement).toBeInTheDocument();

    // Check if the TodoList component is mounted
    const todoListElement = screen.getByTestId('todo-list');
    expect(todoListElement).toBeInTheDocument();
  });
});

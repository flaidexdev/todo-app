import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; 
import TodoItem from './TodoItem';
import { Todo } from '../types';

describe('TodoItem', () => {
  const mockSetTodoData = jest.fn();
  const testTodo: Todo = {
    id: 1,
    content: 'Test Todo',
    category: 'Work',
    done: false,
  };

  it('renders todo content', () => {
    render(<TodoItem todo={testTodo} setTodoData={mockSetTodoData} />);
    expect(screen.getByText('Test Todo')).toBeInTheDocument();
  });

  it('toggles todo completion', () => {
    render(<TodoItem todo={testTodo} setTodoData={mockSetTodoData} />);
    fireEvent.click(screen.getByTestId(/complete/i));
    expect(mockSetTodoData).toHaveBeenCalled();
  });

  it('copies todo content to clipboard', async () => {
    // Mocking clipboard
    const mockClipboard = {
      writeText: jest.fn(),
    };
    Object.assign(navigator, {
      clipboard: mockClipboard,
    });
    
    render(<TodoItem todo={testTodo} setTodoData={mockSetTodoData} />);
    fireEvent.click(screen.getByTestId(/copy/i));
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(testTodo.content);
  });

  it('removes todo', () => {
    render(<TodoItem todo={testTodo} setTodoData={mockSetTodoData} />);
    fireEvent.click(screen.getByTestId(/remove/i));
    expect(mockSetTodoData).toHaveBeenCalled();
  });
});

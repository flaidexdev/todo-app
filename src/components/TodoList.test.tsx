import React from 'react';
import { render, screen } from '@testing-library/react';
import TodoList from './TodoList';
import { Todo } from '../types';

// Mock the localStorage
const mockSetItem = jest.fn();
const mockGetItem = jest.fn();

global.localStorage.__proto__.setItem = mockSetItem;
global.localStorage.__proto__.getItem = mockGetItem;

describe('<TodoList />', () => {
  test('renders without crashing', () => {
    render(<TodoList />);
    expect(screen.getByText(/Total:/i)).toBeInTheDocument();
  });

  test('renders todos and chips correctly', () => {
    mockGetItem.mockReturnValueOnce(JSON.stringify([
      { id: 1, content: 'Test todo 1', category: 'Work', done: true },
      { id: 2, content: 'Test todo 2', category: 'Home', done: false },
    ]));
    render(<TodoList />);
    
    // Check if the todos are being rendered
    expect(screen.getByText(/Test todo 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Test todo 2/i)).toBeInTheDocument();

    // Check the values in the chips
    expect(screen.getByText(/Total: 2/i)).toBeInTheDocument();
    expect(screen.getByText(/Completed: 1/)).toBeInTheDocument();
    expect(screen.getByText(/Uncompleted: 1/i)).toBeInTheDocument();
  });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Sidebar from '../components/Sidebar';

describe('Sidebar component', () => {
  
  // Mock props for the Sidebar component
  const mockProps = {
    status: 'Total',
    setStatus: jest.fn(),
    category: 'Work',
    setCategory: jest.fn(),
    menu: false,
    setMenu: jest.fn(),
    categories: ['Work', 'Personal'],
    setCategories: jest.fn(),
    todoData: [],
    setTodoData: jest.fn(),
    setFilteredTodoData: jest.fn(),
  };

  it('renders without crashing', () => {
    render(<Sidebar {...mockProps} />);
    
    // Example assertion: checks if 'Todo App' is present in the component
    expect(screen.getByText('Todo App')).toBeInTheDocument();
  });
  
});

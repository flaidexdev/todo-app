import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CategoryCard from '../../components/card/Category';
import { Todo } from '../../types'; 

describe('CategoryCard', () => {

  const mockSetCategories = jest.fn();
  const mockSetTodoData = jest.fn();
  const mockSetCategory = jest.fn();

  const defaultProps = {
    data: 'Work',
    setCategories: mockSetCategories,
    todoData: [] as Todo[],
    setTodoData: mockSetTodoData,
    category: 'Work',
    setCategory: mockSetCategory,
  };

  it('renders without crashing', () => {
    render(<CategoryCard {...defaultProps} />);
    expect(screen.getByText(/work/i)).toBeInTheDocument();
  });

  it('should open a popover when trash icon is clicked', () => {
    render(<CategoryCard {...defaultProps} />);
    const trashIcon = screen.getByTestId('trash-icon');
    fireEvent.click(trashIcon);
  
    // Expect popover content to be in the document
    expect(screen.getByText(/are you sure you want to delete this category/i)).toBeInTheDocument();
  });

});

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import CategoryList from '../../components/category/CategoryList'; // Adjust the path accordingly

describe('<CategoryList />', () => {
  const mockCategories: string[] = ['Work', 'Home'];
  const mockSetCategories = jest.fn();
  const mockCategory = 'Work';
  const mockSetCategory = jest.fn();
  const mockTodoData = [{ id: 1, content: 'Test todo', category: 'Work', done: false }];
  const mockSetTodoData = jest.fn();

  it('renders the component without crashing', () => {
    render(
      <CategoryList
        categories={mockCategories}
        setCategories={mockSetCategories}
        category={mockCategory}
        setCategory={mockSetCategory}
        todoData={mockTodoData}
        setTodoData={mockSetTodoData}
      />
    );
    const categoryTitle = screen.getByText('Category');
    expect(categoryTitle).toBeInTheDocument();
  });

  it('renders the list of categories', () => {
    render(
      <CategoryList
        categories={mockCategories}
        setCategories={mockSetCategories}
        category={mockCategory}
        setCategory={mockSetCategory}
        todoData={mockTodoData}
        setTodoData={mockSetTodoData}
      />
    );
    mockCategories.forEach(cat => {
      const categoryElement = screen.getByText(cat);
      expect(categoryElement).toBeInTheDocument();
    });
  });

});

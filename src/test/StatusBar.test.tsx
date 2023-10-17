import React from 'react';
import { render, screen } from '@testing-library/react';
import StatusBar from '../components/StatusBar'; // Adjust this import path if necessary.
import { Todo } from '../types'; // Adjust this import path if necessary.
import '@testing-library/jest-dom/extend-expect';

describe('StatusBar', () => {
    const mockTodoData: Todo[] = [
        { id: 1, content: 'Sample Task 1', done: true, category: 'Work' },
        { id: 2, content: 'Sample Task 2', done: false, category: 'Home' },
    ];

    const mockSetStatus = jest.fn();
    const mockSetFilteredTodoData = jest.fn();

    const defaultProps = {
        status: 'Total',
        setStatus: mockSetStatus,
        todoData: mockTodoData,
        setFilteredTodoData: mockSetFilteredTodoData,
    };

    it('renders without crashing', () => {
        render(<StatusBar {...defaultProps} />);
    });

    it('renders the correct status items', () => {
      render(<StatusBar {...defaultProps} />);
      expect(screen.getByText('Status')).toBeInTheDocument();
      expect(screen.getByText('Total')).toBeInTheDocument();
      expect(screen.getByText('Completed')).toBeInTheDocument();
      expect(screen.getByText('Uncompleted')).toBeInTheDocument();
  });

});


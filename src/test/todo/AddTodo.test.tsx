import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddTodo from '../../components/todo/AddTodo'; 
describe('AddTodo Component', () => {
  const mockSetTodoData = jest.fn();

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  const setup = () => {
    return render(<AddTodo setTodoData={mockSetTodoData} categories={["Work", "Home"]} />);
  };

  it('renders the "Create New" button', () => {
    setup();
    const button = screen.getByTestId('createNew');
    expect(button).toBeInTheDocument();
  });

  it('opens the dialog when "Create New" button is clicked', () => {
    setup();
    const button = screen.getByTestId('createNew');
    fireEvent.click(button);
    const dialogHeader = screen.getByText('Create a new Todo.');
    expect(dialogHeader).toBeInTheDocument();
  });

  it('adds a todo when "Add Todo" button is clicked', () => {
    setup();
    const button = screen.getByTestId('createNew');
    fireEvent.click(button);

    // Assuming you want to add a Todo with the category 'Work'
    const select = screen.getByTestId('category');
    fireEvent.change(select, { target: { value: 'Work' } });

    const textarea = screen.getByTestId('content');
    fireEvent.change(textarea, { target: { value: 'Test Todo' } });

    const addButton = screen.getByTestId('addTodo');
    fireEvent.click(addButton);

    // Assuming the `setTodoData` function is correctly updating the state,
    // this mock function should have been called once.
    expect(mockSetTodoData).toHaveBeenCalledTimes(1);
  });
});

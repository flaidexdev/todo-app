import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { toast } from "react-toastify";

import AddCategory from "../../components/category/AddCategory";

// Mocking react-toastify
jest.mock("react-toastify", () => {
  const original = jest.requireActual("react-toastify");

  return {
    ...original, 
    toast: Object.assign(jest.fn(), {
      error: jest.fn()
    })
  };
});

describe("AddCategory Component", () => {
  it("renders without crashing", () => {
    const mockSetCategories = jest.fn();
    render(<AddCategory categories={[]} setCategories={mockSetCategories} />);
  });

  it('updates input value correctly', async () => {
    const mockSetCategories = jest.fn();
    
    render(<AddCategory categories={[]} setCategories={mockSetCategories} />);
  
    // Click the button that opens the popover
    const openPopoverButton = screen.getByRole('button');
    fireEvent.click(openPopoverButton);
  
    // After clicking the button, query for the input in the opened popover
    const input = await screen.findByTestId("categoryInput") as HTMLInputElement;
  
    fireEvent.change(input, { target: { value: "New Category" } });
    expect(input.value).toBe("New Category");
  });

  it('adds a new category correctly', () => {
    const mockSetCategories = jest.fn();
    
    render(<AddCategory categories={[]} setCategories={mockSetCategories} />);
  
    // Click the button that opens the popover
    const openPopoverButton = screen.getByRole('button');
    fireEvent.click(openPopoverButton);
  
    // Now query for the input and button inside the opened popover
    const input = screen.getByTestId("categoryInput");
    const button = screen.getByTestId("addCategory");
  
    // Continue with your test logic
    fireEvent.change(input, { target: { value: "New Category" } });
    fireEvent.click(button);
    expect(mockSetCategories).toHaveBeenCalled();
    // ... any other assertions you want to make
  });

  it('shows an error toast when trying to add an empty category', () => {
    const mockSetCategories = jest.fn();
    
    render(<AddCategory categories={[]} setCategories={mockSetCategories} />);
  
    // Click the button that opens the popover
    const openPopoverButton = screen.getByRole('button');
    fireEvent.click(openPopoverButton);
  
    // Now query for the button inside the opened popover
    const button = screen.getByTestId("addCategory");
  
    fireEvent.click(button);
    
    // Your assertion for the error toast
    expect(toast.error).toHaveBeenCalledWith("Category Field Can't be Empty!");
  });
  
});


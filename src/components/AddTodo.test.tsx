import React from "react";
import { render, act, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import AddTodo from "./AddTodo";

describe("<AddTodo />", () => {
  beforeAll(() => {
    // Mock window's animate method
    window.Element.prototype.animate = jest.fn();
  });

  it('shows the popover when "Create New" button is clicked', async () => {
    render(<AddTodo setTodoData={jest.fn()} />);
    const createButton = await screen.findByTestId("createNew");
    userEvent.click(createButton);

    const categoryLabel = await screen.findByTestId("category");
    const contentLabel = await screen.findByTestId("content");

    expect(categoryLabel).toBeInTheDocument();
    expect(contentLabel).toBeInTheDocument();
  });

  it("selects a category from the dropdown", async () => {
    render(<AddTodo setTodoData={jest.fn()} />);
    const createButton = await screen.findByTestId("createNew");
    userEvent.click(createButton);

    // Click the select (dropdown) to open options
    const dropdownButton = await screen.findByTestId("category");
    userEvent.click(dropdownButton);

    // Assuming options appear as a list of buttons or clickable elements:
    const optionToSelect = await screen.findByTestId("Personal");
    userEvent.click(optionToSelect);

    // Check for the `data-selected` attribute on the option
    expect(await screen.findByRole("combobox")).toHaveTextContent("Personal");
  });

  it("stores input correctly in the textarea", async () => {
    render(<AddTodo setTodoData={jest.fn()} />);
    const createButton = await screen.findByTestId("createNew");
    userEvent.click(createButton);

    const textarea = await screen.findByTestId("content");
    userEvent.type(textarea, "Test todo content");
    expect(textarea).toHaveValue("Test todo content");
  });

  it('adds a new Todo when "Add Todo" button is clicked', async () => {
    const mockSetTodoData = jest.fn();
    render(<AddTodo setTodoData={mockSetTodoData} />);

    const createButton = await screen.findByTestId("createNew");
    userEvent.click(createButton);

    // Wait for the popover content to be in the document
    const textarea = await screen.findByTestId("content");

    // Ensure the textarea is in the document and can be interacted with
    expect(textarea).toBeInTheDocument();

    userEvent.type(textarea, "Test todo content");
    expect(textarea).toHaveValue("Test todo content");

    const addButton = await screen.findByTestId("addTodo");
    userEvent.click(addButton);

    // Wait and assert that the mock function has been called
    await waitFor(() => expect(mockSetTodoData).toHaveBeenCalled());
  });
});

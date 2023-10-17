import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import StatusCard from '../../components/card/Status'; 

describe('StatusCard Component', () => {
  const mockSetStatus = jest.fn();

  const renderComponent = () => {
    return render(
      <StatusCard
        data="Total"
        todoData={[
          { id: 1, content: 'Task 1', done: false, category: 'Work' },
          { id: 2, content: 'Task 2', done: true, category: 'Home' },
        ]}
        status="Total"
        setStatus={mockSetStatus}
      />
    );
  };

  it('displays the correct count for "Total"', () => {
    renderComponent();
    const badgeContent = screen.getByText('2');
    expect(badgeContent).toBeInTheDocument();
  });

  it('updates status when clicked', () => {
    renderComponent();
    const statusText = screen.getByText('Total');
    fireEvent.click(statusText);  // Assuming the click event bubbles up correctly
    expect(mockSetStatus).toHaveBeenCalledWith('Total');
  });
  
});

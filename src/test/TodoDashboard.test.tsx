import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TodoDashboard from '../components/TodoDashboard';

describe('<TodoDashboard />', () => {
  // Basic rendering test
  it('should render without crashing', () => {
    render(<TodoDashboard />);
  });

});


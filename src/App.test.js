import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('Farewell, front-end', () => {
  const { queryByText } = render(<App />);
  const linkElement = queryByText(/TRYBE/i);
  expect(linkElement).not.toBeInTheDocument();
});

import { render, screen } from '@testing-library/react';
import App from './App';

test('Test login page', () => {
  render(<App />);
  const title = screen.getByText('Welcome to the MTWT series');
  expect(title).toBeInTheDocument();
});

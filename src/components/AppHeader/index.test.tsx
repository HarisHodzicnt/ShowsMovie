import { render, screen } from '@testing-library/react';
import { AppHeader } from '.';

test('Test login page', () => {
  render(<AppHeader />);
  const title = screen.getByText('Logout');
  expect(title).toBeInTheDocument();
});

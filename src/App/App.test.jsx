import { render, screen } from '@testing-library/react';
import { App } from './App';

test('renders learn react with Dev Incubator link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Dev Incubator/i);
  expect(linkElement).toBeInTheDocument();
});

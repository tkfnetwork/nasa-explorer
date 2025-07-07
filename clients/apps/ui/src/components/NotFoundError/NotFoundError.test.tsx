import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NotFoundError } from './NotFoundError';
import { axe } from 'jest-axe';

const renderElement = () => <NotFoundError />;
const renderComponent = () => render(renderElement());

test('NotFoundError is accessible', async () => {
  const { container } = renderComponent();
  const results = await axe(container);

  expect(results).toHaveNoViolations();
});

test('user can go back', async () => {
  const windowSpy = jest.spyOn(window.history, 'back');

  renderComponent();

  await userEvent.click(screen.getByRole('button', { name: 'reset button' }));

  expect(windowSpy).toHaveBeenCalled();
});

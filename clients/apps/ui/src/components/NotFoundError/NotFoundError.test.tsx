import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NotFoundError } from './NotFoundError';
import { axe } from 'vitest-axe';
import { afterEach, expect, test, vi } from 'vitest';

const renderElement = () => <NotFoundError />;
const renderComponent = () => render(renderElement());

afterEach(() => {
  cleanup();
});

test('NotFoundError is accessible', async () => {
  const { container } = renderComponent();
  const results = await axe(container);

  expect(results).toHaveNoViolations();
});

test('user can go back', async () => {
  const windowSpy = vi.spyOn(window.history, 'back');

  renderComponent();

  await userEvent.click(screen.getByRole('button', { name: 'reset button' }));

  expect(windowSpy).toHaveBeenCalled();
});

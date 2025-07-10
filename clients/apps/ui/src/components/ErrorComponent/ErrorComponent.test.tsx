import { i18n } from '@ne/i18n';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, expect, test, vi } from 'vitest';
import { axe } from 'vitest-axe';
import { ErrorComponent } from './ErrorComponent';
import type { ErrorComponentProps } from './ErrorComponent.types';

const renderElement = (props: ErrorComponentProps) => (
  <ErrorComponent {...props} />
);
const renderComponent = (props: ErrorComponentProps) =>
  render(renderElement(props));

afterEach(() => {
  cleanup();
});

test('ErrorComponent is accessible', async () => {
  const { container } = renderComponent({
    error: new Error(''),
    reset: vi.fn(),
  } as unknown as ErrorComponentProps);
  const results = await axe(container);

  expect(results).toHaveNoViolations();
});

test('development shows correct error message', () => {
  const devMessage = 'internal error';
  const prodMessage = i18n.t('common:oopsProblem');

  const props = {
    error: new Error(devMessage),
    reset: vi.fn(),
  } as unknown as ErrorComponentProps;

  renderComponent(props);

  expect(screen.queryByText(devMessage)).not.toBeInTheDocument();
  expect(screen.getByText(prodMessage)).toBeInTheDocument();
});

test('reset button can be hidden', () => {
  renderComponent({ error: new Error('Error') });

  expect(
    screen.queryByRole('button', { name: 'reset button' })
  ).not.toBeInTheDocument();
});

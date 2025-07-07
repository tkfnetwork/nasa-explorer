import { render, screen } from '@testing-library/react';
import { ErrorComponent } from './ErrorComponent';
import type { ErrorComponentProps } from './ErrorComponent.types';
import { axe } from 'jest-axe';
import { i18n } from '@ne/i18n';

const renderElement = (props: ErrorComponentProps) => (
  <ErrorComponent {...props} />
);
const renderComponent = (props: ErrorComponentProps) =>
  render(renderElement(props));

test('ErrorComponent is accessible', async () => {
  const { container } = renderComponent({
    error: new Error(''),
    reset: jest.fn(),
  } as unknown as ErrorComponentProps);
  const results = await axe(container);

  expect(results).toHaveNoViolations();
});

test('development shows correct error message', () => {
  const devMessage = 'internal error';
  const prodMessage = i18n.t('common:oopsProblem');

  const props = {
    error: new Error(devMessage),
    reset: jest.fn(),
  } as unknown as ErrorComponentProps;

  const { rerender } = renderComponent(props);

  expect(screen.queryByText(devMessage)).not.toBeInTheDocument();
  expect(screen.getByText(prodMessage)).toBeInTheDocument();

  process.env.NODE_ENV = 'development';

  rerender(renderElement(props));

  expect(screen.getByText(devMessage)).toBeInTheDocument();
  expect(screen.queryByText(prodMessage)).not.toBeInTheDocument();
});

test('reset button can be hidden', () => {
  renderComponent({ error: new Error('Error') });

  expect(
    screen.queryByRole('button', { name: 'reset button' })
  ).not.toBeInTheDocument();
});

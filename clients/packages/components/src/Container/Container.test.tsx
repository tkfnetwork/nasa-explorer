import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { expect, test } from 'vitest';
import { Container } from './Container';
import { ContainerProps } from './Container.types';

const renderElement = (props: ContainerProps) => <Container {...props} />;
const renderComponent = (props: ContainerProps) => render(renderElement(props));

test('Container is accessible', async () => {
  const { container } = renderComponent({});
  const results = await axe(container);

  expect(results).toHaveNoViolations();
});

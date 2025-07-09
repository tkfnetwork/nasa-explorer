import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { expect, test } from 'vitest';

import { InputContainer } from './InputContainer';
import type { InputContainerProps } from './InputContainer.types';

const renderElement = (props: InputContainerProps) => (
  <InputContainer {...props} />
);
const renderComponent = (props: InputContainerProps) =>
  render(renderElement(props));

test('InputContainer is accessible', async () => {
  const { container } = renderComponent({});
  const results = await axe(container);

  expect(results).toHaveNoViolations();
});

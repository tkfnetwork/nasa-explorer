import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { test, expect } from 'vitest';

import { Select } from './Select';
import type { SelectProps } from './Select.types';
import { selectValueFactory } from './_mocks';

const renderElement = ({
  'aria-label': ariaLabel = 'select',
  ...props
}: SelectProps) => <Select aria-label={ariaLabel} {...props} />;
const renderComponent = (props: SelectProps) => render(renderElement(props));

test('Select is accessible', async () => {
  const { container } = renderComponent({
    options: [{ options: selectValueFactory.buildList(10) }],
  });
  const results = await axe(container);

  expect(results).toHaveNoViolations();
});

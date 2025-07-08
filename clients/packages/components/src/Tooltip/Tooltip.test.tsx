import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { expect, test } from 'vitest';
import { Tooltip } from './Tooltip';
import { TooltipProps } from './Tooltip.types';

const renderElement = (props: TooltipProps) => <Tooltip {...props} />;
const renderComponent = (props: TooltipProps) => render(renderElement(props));

test('Tooltip is accessible', async () => {
  const { container } = renderComponent({});
  const results = await axe(container);

  expect(results).toHaveNoViolations();
});

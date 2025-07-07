import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { expect, test } from 'vitest';
import { NavMenu } from './NavMenu';
import { NavMenuProps } from './NavMenu.types';

const renderElement = (props: NavMenuProps) => <NavMenu {...props} />;
const renderComponent = (props: NavMenuProps) => render(renderElement(props));

test('NavMenu is accessible', async () => {
  const { container } = renderComponent({});
  const results = await axe(container);

  expect(results).toHaveNoViolations();
});

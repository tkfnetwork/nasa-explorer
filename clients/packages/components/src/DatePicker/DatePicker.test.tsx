import { render } from '@testing-library/react';
import { expect, test } from 'vitest';
import { axe } from 'vitest-axe';

import { DatePicker } from './DatePicker';
import type {
  DatePickerProps,
  DatePickerRangeValue,
  DatePickerValue,
} from './DatePicker.types';

const renderElement = <Value extends DatePickerValue | DatePickerRangeValue>(
  props: DatePickerProps<Value>
) => <DatePicker {...props} />;
const renderComponent = <Value extends DatePickerValue | DatePickerRangeValue>(
  props: DatePickerProps<Value>
) => render(renderElement(props));

test('DatePicker is accessible', async () => {
  const { container } = renderComponent({});
  const results = await axe(container);

  expect(results).toHaveNoViolations();
});

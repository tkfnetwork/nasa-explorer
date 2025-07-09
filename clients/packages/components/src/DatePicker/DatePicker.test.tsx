// import { fireEvent, render, screen } from '@testing-library/react';
// import { axe } from 'vitest-axe';
// import { describe, expect, test } from 'vitest';

// import { DatePicker } from './DatePicker';
// import type {
//   DatePickerProps,
//   DatePickerRangeValue,
//   DatePickerValue,
// } from './DatePicker.types';
// import { useBreakpoints } from '../hooks';

// vite.mock('../hooks', () => ({
//   ...vite.requireActual('../hooks'),
//   useBreakpoints: vite.fn(() => ({
//     xl: false,
//     lg: false,
//     md: true,
//     sm: false,
//     xs: false,
//   })),
// }));

// const mockUseBreakpoints = useBreakpoints as jest.Mock;

// const renderElement = <Value extends DatePickerValue | DatePickerRangeValue>(
//   props: DatePickerProps<Value>
// ) => <DatePicker {...props} />;
// const renderComponent = <Value extends DatePickerValue | DatePickerRangeValue>(
//   props: DatePickerProps<Value>
// ) => render(renderElement(props));

// test('DatePicker is accessible', async () => {
//   const { container } = renderComponent({});
//   const results = await axe(container);

//   expect(results).toHaveNoViolations();
// });

// describe('Breakpoints', () => {
//   describe('DatePicker with time selector', () => {
//     test('Fullscreen portal shows on devices smaller and equal to md', async () => {
//       const props: DatePickerProps<DatePickerValue> = {
//         fullScreen: false,
//         timeSelector: true,
//       };
//       const { baseElement } = renderComponent(props);

//       const fromNode = screen.getByRole('textbox');
//       fireEvent.click(fromNode);

//       const pickerPortal = baseElement.querySelector(
//         '.react-datepicker__portal'
//       );
//       expect(pickerPortal).toBeInTheDocument();
//     });

//     test('Fullscreen portal does not show on devices larger than md', async () => {
//       mockUseBreakpoints.mockImplementation(() => ({
//         xl: false,
//         lg: true,
//         md: false,
//         sm: false,
//         xs: false,
//       }));
//       const props: DatePickerProps<DatePickerValue> = {
//         fullScreen: false,
//         timeSelector: true,
//       };
//       const { baseElement } = renderComponent(props);

//       const fromNode = screen.getByRole('textbox');
//       fireEvent.click(fromNode);

//       const pickerPortal = baseElement.querySelector(
//         '.react-datepicker__portal'
//       );
//       expect(pickerPortal).not.toBeInTheDocument();
//     });
//   });
// });

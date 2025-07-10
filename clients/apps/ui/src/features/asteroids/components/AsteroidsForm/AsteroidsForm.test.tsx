import { formatDate, type Units } from '@/utils';
import type { DatePickerRangeValue } from '@ne/components';
import { i18n } from '@ne/i18n';
import { useNavigate } from '@tanstack/react-router';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { format } from 'date-fns';
import { afterEach, beforeEach, expect, test, vi, type Mock } from 'vitest';
import { useAsteroidsContext } from '../AsteroidsPage/AsteroidsPage.context';
import { AsteroidsForm } from './AsteroidsForm';

vi.mock('@tanstack/react-router', () => ({
  useNavigate: vi.fn(() => vi.fn()),
  useLocation: vi.fn(() => '/'),
}));

vi.mock('../AsteroidsPage/AsteroidsPage.context', () => ({
  useAsteroidsContext: vi.fn(() => ({
    dates: [],
    unit: undefined,
  })),
}));

const useAsteroidsContextMock = useAsteroidsContext as Mock;
const useNavigateMock = useNavigate as Mock;

const renderElement = () => <AsteroidsForm />;
const renderComponent = () => render(renderElement());

beforeEach(() => {
  vi.resetAllMocks();
});

afterEach(() => {
  cleanup();
});

test('form is populated with default values', async () => {
  const { baseElement } = renderComponent();

  let inputElements = screen.getAllByLabelText('date input');
  let unitElement = baseElement.querySelector('[data-slot]="select-value"');

  for (const inputElement of inputElements) {
    expect(inputElement).toHaveValue('');
  }

  expect(unitElement).toHaveTextContent('');

  const dates: DatePickerRangeValue = [new Date(), new Date()];
  const unit: Units = 'kilometers';

  useAsteroidsContextMock.mockImplementation(() => ({
    dates,
    unit,
  }));

  // Dont use `rerender` here as the values dont reset automatically
  // TODO: add `reset` logic from RHF instead
  cleanup();
  renderComponent();

  inputElements = screen.getAllByLabelText('date input');
  unitElement = baseElement.querySelector('[data-slot]="select-value"');

  expect(inputElements.at(0)).toHaveValue(format(dates[0]!, 'dd/MM/yyyy'));
  expect(inputElements.at(1)).toHaveValue(format(dates[1]!, 'dd/MM/yyyy'));

  expect(unitElement).toHaveTextContent(i18n.t(`common:${unit}`));
});

test('dates cannot be greater than 7 days', async () => {
  renderComponent();

  const inputElements = screen.getAllByLabelText('date input');

  await userEvent.type(inputElements[0], '01/01/2022[Tab]');
  await userEvent.type(inputElements[1], '09/01/2022[Tab]');

  await waitFor(() => expect(inputElements[1]).toHaveValue(''));
  await userEvent.type(inputElements[1], '07/01/2022[Tab]');

  await waitFor(() => expect(inputElements[1]).toHaveValue('07/01/2022'));
});

test('form updates query state on change', async () => {
  const dates: DatePickerRangeValue = [new Date(), new Date()];
  const unit: Units = 'kilometers';

  const navigate = vi.fn();
  useNavigateMock.mockReturnValue(navigate);

  useAsteroidsContextMock.mockReturnValue({
    dates,
    unit,
  });

  const expected = 'miles';

  const { baseElement } = renderComponent();

  await userEvent.selectOptions(baseElement.querySelector('select')!, [
    expected,
  ]);

  expect(navigate).toHaveBeenCalledWith({
    search: {
      endDate: formatDate(dates[0] as Date),
      startDate: formatDate(dates[1] as Date),
      unit: expected,
    },
    to: '/',
  });
});

test('form shows validation icon', async () => {
  renderComponent();

  const inputElements = screen.getAllByLabelText('date input');

  await userEvent.type(inputElements[1], '07/01/2022[Tab]');

  const warning = await screen.findByTitle(i18n.t('common:validationErrors'));

  await userEvent.hover(warning);

  expect(screen.getAllByText('Start date is required')[0]).toBeInTheDocument();
});

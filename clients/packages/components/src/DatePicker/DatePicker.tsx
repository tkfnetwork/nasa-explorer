import clsx from 'clsx';
import type { DatePickerProps as BaseProps } from 'react-datepicker';
import BaseDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { RxDash } from 'react-icons/rx';
import { flip, size } from '@floating-ui/dom';

// @ts-expect-error workaround for es modules
const Component = BaseDatePicker?.default ?? BaseDatePicker;

import { useBreakpoints, useControlledProp } from '../hooks';
import { InputContainer } from '../InputContainer';
import './DatePicker.css';
import type {
  DatePickerProps,
  DatePickerRangeValue,
  DatePickerValue,
} from './DatePicker.types';

export const DatePicker = <
  Value extends DatePickerValue | DatePickerRangeValue,
>({
  value: propValue,
  onChange,
  range,
  min = new Date('1970-01-01'),
  max,
  placeholder,
  dismissable,
  monthSelector = true,
  yearSelector = true,
  timeSelector,
  fullScreen,
  open,
  dateFormat = 'P',
}: DatePickerProps<Value>) => {
  const { value, setValue } = useControlledProp(propValue, onChange);
  const { md } = useBreakpoints('max');

  const isArrayValue = Array.isArray(value);
  const isRange = range ?? isArrayValue;
  const [startPlaceholder, endPlaceholder] = Array.isArray(placeholder)
    ? placeholder
    : [placeholder];

  const startDate = (
    isArrayValue ? (value?.at(0) ?? null) : (value ?? null)
  ) as Date | null;
  const endDate = isArrayValue ? (value?.at(1) ?? null) : null;

  const handleChange = (type?: 'start' | 'end') => (dates: DatePickerValue) => {
    if (type) {
      return setValue([
        type === 'start' ? dates : startDate,
        type === 'end' ? dates : endDate,
      ] as Value);
    }

    setValue(dates as Value);
  };

  const getCustomInput = () => (
    <input
      aria-label="date input"
      className={clsx('bg-transparent', 'h-full', 'w-full', 'px-3', 'py-2', {
        ['text-center']: isRange,
        ['pr-8']: dismissable,
      })}
    />
  );

  const commonProps: BaseProps = {
    calendarClassName: clsx('rounded-md', 'border'),
    dateFormat,
    portalId: 'calendar-portal',
    showPopperArrow: false,
    popperPlacement: 'top-end',
    showMonthDropdown: monthSelector,
    showYearDropdown: yearSelector,
    swapRange: isRange,
    open,
    withPortal: fullScreen,
    ...(timeSelector && {
      showTimeSelect: timeSelector,
      timeFormat: 'HH:mm',
      timeIntervals: 15,
      timeCaption: 'time',
      dateFormat: 'Pp',
      shouldCloseOnSelect: true,
      withPortal: md ? true : fullScreen,
    }),
    popperModifiers: [flip(), size()],
  };

  return (
    <InputContainer>
      <Component
        {...commonProps}
        customInput={getCustomInput()}
        selectsStart={isRange}
        selected={startDate}
        startDate={isRange ? startDate : undefined}
        endDate={isRange ? endDate : undefined}
        minDate={min}
        maxDate={max}
        onChange={handleChange(isRange ? 'start' : undefined)}
        placeholderText={startPlaceholder}
        isClearable={dismissable && Boolean(startDate)}
      />
      {isRange ? (
        <>
          <RxDash className={clsx('flex-shrink-0')} />
          <Component
            {...commonProps}
            customInput={getCustomInput()}
            selected={endDate}
            startDate={startDate}
            endDate={endDate}
            selectsEnd
            minDate={startDate ?? min}
            maxDate={max}
            onChange={handleChange('end')}
            placeholderText={endPlaceholder}
            isClearable={dismissable && Boolean(endDate)}
          />
        </>
      ) : null}
    </InputContainer>
  );
};

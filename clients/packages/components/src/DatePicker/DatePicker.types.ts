export type DatePickerValue = Date | null;

export type DatePickerRangeValue = [DatePickerValue, DatePickerValue];

export type DatePickerProps<
  Value extends DatePickerValue | DatePickerRangeValue,
> = {
  value?: Value;
  range?: boolean;
  min?: Date;
  max?: Date;
  placeholder?: string | [string, string];
  timeSelector?: boolean;
  dismissable?: boolean;
  monthSelector?: boolean;
  yearSelector?: boolean;
  fullScreen?: boolean;
  open?: boolean;
  onChange?: (value: Value) => void;
  dateFormat?: string;
};

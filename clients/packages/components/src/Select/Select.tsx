import type { SelectProps } from './Select.types';

import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Select as BaseSelect,
} from '@/_shadcn/components/ui/select';

export const Select = ({
  options,
  placeholder,
  value,
  open,
  onOpenChange,
  onChange,
  className,
  ...props
}: SelectProps) => (
  <BaseSelect
    value={value}
    open={open}
    onOpenChange={onOpenChange}
    onValueChange={onChange}
  >
    <SelectTrigger {...props} className={className}>
      <SelectValue placeholder={placeholder} />
    </SelectTrigger>
    <SelectContent>
      {options.map(({ label, options }, i) => (
        <SelectGroup key={i}>
          {label ? <SelectLabel>{label}</SelectLabel> : null}
          {options.map(({ label, value }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectGroup>
      ))}
    </SelectContent>
  </BaseSelect>
);

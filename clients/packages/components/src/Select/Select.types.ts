import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import type { SelectTrigger } from '@/_shadcn/components/ui/select';

export type SelectItem = {
  label: ReactNode;
  value: string;
};

export type SelectGroup = {
  label?: ReactNode;
  options: SelectItem[];
};

export type SelectProps = {
  options: SelectGroup[];
  value?: string;
  placeholder?: string;
  open?: boolean;
  onOpenChange?: (isOpen?: boolean) => void;
  onChange?: (value: string) => void;
  className?: string;
} & ComponentPropsWithoutRef<typeof SelectTrigger>;

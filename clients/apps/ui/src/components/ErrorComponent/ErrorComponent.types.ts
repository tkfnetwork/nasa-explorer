import type { ErrorComponentProps as BaseProps } from '@tanstack/react-router';
import type { ReactNode } from 'react';

export type ErrorComponentProps = Partial<BaseProps> & {
  resetLabel?: ReactNode;
  showMessage?: boolean;
};

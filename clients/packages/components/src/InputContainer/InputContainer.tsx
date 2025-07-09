import clsx from 'clsx';
import type { ForwardedRef } from 'react';
import { forwardRef } from 'react';

import type { InputContainerProps } from './InputContainer.types';

export const InputContainer = forwardRef(
  (
    { children, className, disabled }: InputContainerProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => (
    <div
      ref={ref}
      className={clsx(
        'flex',
        'items-center',
        'h-10',
        'w-full',
        'rounded-md',
        'border',
        'border-input',
        'bg-background',
        'text-base',
        'ring-offset-background',
        'file:border-0',
        'file:bg-transparent',
        'file:text-sm',
        'file:font-medium',
        'file:text-foreground',
        'placeholder:text-muted-foreground',
        'focus-visible:outline-none',
        'focus-visible:ring-2',
        'focus-visible:ring-ring',
        'focus-visible:ring-offset-2',
        {
          ['cursor-not-allowed']: disabled,
          ['opacity-50']: disabled,
        },
        'md:text-sm',
        className
      )}
    >
      {children}
    </div>
  )
);

InputContainer.displayName = 'InputContainer';

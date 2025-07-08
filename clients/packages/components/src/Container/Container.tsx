import { cn } from '@/_shadcn/lib/utils';
import { ContainerProps } from './Container.types';
import { forwardRef } from 'react';

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'inline-flex',
        'items-center',
        'gap-2',
        'bg-slate-900',
        'py-1',
        'px-2',
        'rounded-md',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);

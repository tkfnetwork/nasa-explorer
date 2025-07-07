import { cn } from '@/_shadcn/lib/utils';
import { ContainerProps } from './Container.types';

export const Container = ({
  className,
  children,
  ...props
}: ContainerProps) => (
  <div
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
);

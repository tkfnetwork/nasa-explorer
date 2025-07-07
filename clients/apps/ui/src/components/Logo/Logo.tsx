import { cn } from '@ne/components';
import LogoSvg from '../../assets/images/logo.svg?react';
import type { LogoProps } from './Logo.types';

export const Logo = ({ className }: LogoProps) => (
  <LogoSvg
    className={cn('max-w-128', 'max-h-12', 'text-[#fc3c23]', className)}
  />
);

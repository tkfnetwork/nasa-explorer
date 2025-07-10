import { cn } from '@ne/components';
import LogoSvg from '../../assets/images/logo.svg?react';
import type { LogoProps } from './Logo.types';
import { FaCompass } from 'react-icons/fa';
import { useTranslation } from '@ne/i18n/react';

export const Logo = ({ className }: LogoProps) => {
  const { t } = useTranslation(['common']);

  return (
    <div
      title={t('common:nasaExplorer')}
      className={cn('inline-flex', 'gap-1', 'text-3xl', 'items-center')}
    >
      <LogoSvg className={cn('w-28', 'h-12', 'text-[#fc3c23]', className)} />
      <FaCompass className={cn('fill-[#9fc5e8]')} />
    </div>
  );
};

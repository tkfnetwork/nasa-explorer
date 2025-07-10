import { Button, cn } from '@ne/components';
import { useTranslation } from '@ne/i18n/react';
import { GoDot } from 'react-icons/go';
import { Hero } from '../Hero';
import { useNavigate } from '@tanstack/react-router';
import { AppRoutes } from '@/constants';

export const HomePage = () => {
  const { t } = useTranslation(['common']);

  const navigate = useNavigate();

  return (
    <div
      className={cn(
        'flex',
        'flex-col',
        'w-[1200px]',
        'max-w-full',
        'h-full',
        'md:justify-center',
        'mx-auto',
        'my-0'
      )}
    >
      <div
        className={cn(
          'flex',
          'overflow-auto',
          'max-md:flex-col',
          'items-center',
          'md:gap-4'
        )}
      >
        <div className={cn('basis-1/2', 'flex', 'flex-col', 'gap-4')}>
          <h1>{t('common:welcomeExplorer')}</h1>
          <p>{t('common:description')}</p>
          <div>
            <Button onClick={() => navigate({ to: AppRoutes.Asteroids })}>
              Lets Go!
            </Button>
          </div>
        </div>
        <GoDot className={cn('text-3xl', 'text-slate-700')} />
        <div
          className={cn(
            'basis-1/2',
            'flex',
            'items-center',
            'justify-center',
            'aspect-square'
          )}
        >
          <Hero />
        </div>
      </div>
    </div>
  );
};

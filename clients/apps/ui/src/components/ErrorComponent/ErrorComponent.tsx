import { Button, cn } from '@ne/components';
import { useTranslation } from '@ne/i18n/react';
import type { ErrorComponentProps } from './ErrorComponent.types';
import { Logo } from '../Logo';
import { isDev } from '@/config';

export const ErrorComponent = ({
  error,
  reset,
  resetLabel,
  showMessage,
}: ErrorComponentProps) => {
  const { t } = useTranslation(['common']);

  const message =
    isDev || showMessage ? error?.message?.toString() : t('common:oopsProblem');

  return (
    <div
      className={cn(
        'flex',
        'flex-col',
        'w-full',
        'h-full',
        'items-center',
        'justify-center',
        'gap-3'
      )}
    >
      <Logo />
      <span>{message}</span>
      {reset ? (
        <Button aria-label="reset button" onClick={reset}>
          {resetLabel ?? t('common:tryAgain')}
        </Button>
      ) : null}
    </div>
  );
};

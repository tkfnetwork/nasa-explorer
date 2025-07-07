import { AppRoutes } from '@/constants';
import { cn, Container } from '@ne/components';
import { useTranslation } from '@ne/i18n/react';
import { Link } from '@tanstack/react-router';

export const Footer = () => {
  const { t } = useTranslation(['common']);

  return (
    <Container>
      <Link to={AppRoutes.Copyright}>
        <span className={cn('text-xs')}>
          {t('common:copyright', { year: new Date().getFullYear() })}
        </span>
      </Link>
    </Container>
  );
};

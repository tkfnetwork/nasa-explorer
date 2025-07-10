import { cn, Container, NavMenu } from '@ne/components';
import { Logo } from '../Logo';
import { Link, useLocation } from '@tanstack/react-router';
import { AppRoutes } from '@/constants';
import { useTranslation } from '@ne/i18n/react';

export const Header = () => {
  const { t } = useTranslation(['common']);
  const pathname = useLocation({ select: (state) => state.pathname });

  const menuItems = [
    {
      to: AppRoutes.Asteroids,
      label: t('common:asteroids'),
    },
  ];

  return (
    <Container>
      <Link
        to="/"
        aria-label={t('common:nasaExplorer')}
        className={cn('flex', 'items-center')}
      >
        <Logo className={cn('shrink-0', 'h-8')} />
      </Link>
      <NavMenu>
        {menuItems.map(({ to, label }) => (
          <NavMenu.Item key={to}>
            <NavMenu.Link asChild data-active={pathname?.startsWith(to)}>
              <Link to={to}>{label}</Link>
            </NavMenu.Link>
          </NavMenu.Item>
        ))}
      </NavMenu>
    </Container>
  );
};

import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

import { ErrorComponent, Meta, NotFoundError } from '@/components';
import { withProviders } from '@/hocs';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import './dev-tools.css';

export const Route = createRootRoute({
  component: withProviders(Root),
  errorComponent: ErrorComponent,
  notFoundComponent: NotFoundError,
  head: () => ({
    meta: [
      {
        title: 'NASA Explorer',
      },
    ],
  }),
});

function Root() {
  return (
    <>
      <HeadContent />
      <Meta />
      <Outlet />
      <TanStackRouterDevtools
        position="bottom-left"
        initialIsOpen={false}
        toggleButtonProps={{ className: 'ts-router' }}
      />
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
      <Scripts />
    </>
  );
}

import { Header } from '@/components';
import { Footer } from '@/components/Footer';
import { cn, useBreakpoints } from '@ne/components';
import { createFileRoute, Outlet, useMatches } from '@tanstack/react-router';

export const Route = createFileRoute('/_app')({
  component: RootLayout,
  head: () => ({
    links: [{ rel: 'preconnect', href: import.meta.env.VITE_API_BASE_URL }],
  }),
});

function RootLayout() {
  const matches = useMatches();

  const { md } = useBreakpoints('min');

  const isFullScreen =
    md && Boolean(matches.toReversed().at(0)?.staticData?.fullScreen);

  return (
    <div
      className={cn('flex', 'flex-col', 'overflow-hidden', 'w-full', 'h-full')}
    >
      <div
        className={cn(
          'p-2',
          isFullScreen && ['fixed', 'top-0', 'left-0', 'z-[9999]']
        )}
      >
        <Header />
      </div>
      <main
        className={cn(
          'flex-1',
          !isFullScreen && 'px-3',
          'py-2',
          'overflow-hidden'
        )}
      >
        <Outlet />
      </main>
      <div
        className={cn(
          'p-2',
          isFullScreen
            ? ['fixed', 'bottom-0', 'right-0', 'z-[9999]']
            : ['flex', 'justify-end', 'w-full']
        )}
      >
        <Footer />
      </div>
    </div>
  );
}

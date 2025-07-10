import { HomePage } from '@/features';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/')({
  component: HomePage,
  head: () => ({
    links: [{ rel: 'preconnect', href: 'https://apod.nasa.gov' }],
  }),
});

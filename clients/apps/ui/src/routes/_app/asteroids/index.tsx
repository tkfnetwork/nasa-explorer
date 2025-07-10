import { AsteroidsPage } from '@/features';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/asteroids/')({
  component: AsteroidsPage,
  head: () => ({
    meta: [
      {
        title: 'Asteroids',
      },
    ],
  }),
  staticData: {
    fullScreen: true,
  },
});

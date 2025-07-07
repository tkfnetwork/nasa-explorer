import { Globe } from '@ne/components';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/asteroids/')({
  component: RouteComponent,
  staticData: {
    fullScreen: true,
  },
});

function RouteComponent() {
  return <Globe />;
}

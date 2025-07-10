import { Card, CardContent, cn } from '@ne/components';
import { useTranslation } from '@ne/i18n/react';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/copyright/')({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: 'Copyright',
      },
    ],
  }),
});

function RouteComponent() {
  const { t } = useTranslation(['common']);

  const sections = t('common:disclaimer').split('\n');

  return (
    <div
      className={cn(
        'flex',
        'items-center',
        'justify-center',
        'h-full',
        'w-full'
      )}
    >
      <Card
        className={cn(
          'w-[800px]',
          'min-h-[400px]',
          'max-h-full',
          'max-w-full',
          'overflow-auto'
        )}
      >
        <CardContent className={cn('flex', 'flex-col', 'gap-3')}>
          {sections.map((section, i) => (
            <p key={i}>{section}</p>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  cn,
  Skeleton,
} from '@ne/components';

export const AsteroidsListItemSkeleton = () => (
  <Card data-skeleton className={cn('brightness-120')}>
    <CardHeader>
      <CardTitle className={cn('flex', 'justify-between', 'items-center')}>
        <Skeleton className={cn('w-48', 'h-6')} />
      </CardTitle>
      <CardDescription>
        <Skeleton className={cn('w-32', 'h-5')} />
      </CardDescription>
    </CardHeader>
    <CardContent className={cn('flex', 'flex-col', 'gap-3')}>
      <div className={cn('flex', 'flex-col', 'gap-1')}>
        <Skeleton className={cn('w-32', 'h-5')} />
        <Skeleton className={cn('w-48', 'h-5')} />
      </div>
      <div className={cn('flex', 'gap-2')}>
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className={cn('flex', 'flex-col', 'gap-1', 'w-1/3')}>
            <Skeleton className={cn('w-2/3', 'h-5')} />
            <Skeleton className={cn('w-3/3', 'h-5')} />
          </div>
        ))}
      </div>
    </CardContent>
    <CardFooter className={cn('flex', 'justify-end')}>
      <Skeleton className={cn('w-24', 'h-5')} />
    </CardFooter>
  </Card>
);

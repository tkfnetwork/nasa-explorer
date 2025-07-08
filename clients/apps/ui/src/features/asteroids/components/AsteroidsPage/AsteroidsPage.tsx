import { cn } from '@ne/components';
import { AsteroidsGlobe } from '../AsteroidsGlobe';
import { AsteroidsList } from '../AsteroidsList';
import { useAsteroids } from '../../queries';
import uniq from 'lodash/uniq';

export const AsteroidsPage = () => {
  const { data } = useAsteroids();

  const ids = uniq(
    Object.values(data?.data ?? {})
      .flat()
      .map(({ id }) => id)
      .filter(Boolean) as string[]
  );

  return (
    <div className={cn('relative')}>
      <div className={cn('relative', 'z-10')}>
        <AsteroidsGlobe ids={ids} />
      </div>
      <div
        className={cn(
          'absolute',
          'top-3',
          'bottom-3',
          'right-3',
          'flex',
          'flex-col',
          'justify-center',
          'z-20',
          'w-[25%]'
        )}
      >
        <div className={cn('h-[50%]', 'w-full')}>
          <AsteroidsList />
        </div>
      </div>
    </div>
  );
};

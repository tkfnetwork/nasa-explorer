import { cn } from '@ne/components';
import { useSearch } from '@tanstack/react-router';
import orderBy from 'lodash/orderBy';
import uniq from 'lodash/uniq';
import { useAsteroidsQuery } from '../../queries';
import { AsteroidsForm, type AsteroidsFormValues } from '../AsteroidsForm';
import { AsteroidsGlobe } from '../AsteroidsGlobe';
import { AsteroidsList } from '../AsteroidsList';
import { AsteroidsPageProvider } from './AsteroidsPage.context';
import { useState } from 'react';

export const AsteroidsPage = () => {
  const [focusedId, setFocusedId] = useState<string | undefined>();
  const {
    startDate,
    endDate,
    unit = 'kilometers',
  } = useSearch({
    strict: false,
    structuralSharing: false,
  }) as AsteroidsFormValues;

  const { data, isLoading } = useAsteroidsQuery({
    startDate,
    endDate,
  });

  const sortedData = orderBy(
    Object.entries(data?.data ?? {}),
    [([date]) => new Date(date).getTime()],
    ['desc']
  ).flatMap(([, values]) => values);

  const ids = uniq(sortedData.map(({ id }) => id).filter(Boolean) as string[]);

  return (
    <AsteroidsPageProvider
      value={{
        focusedId,
        setFocusedId,
        isActive: isLoading,
        unit,
        dates: [
          startDate ? new Date(startDate) : null,
          endDate ? new Date(endDate) : null,
        ],
      }}
    >
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
            'gap-3',
            'z-20',
            'w-[25%]'
          )}
        >
          <div>
            <AsteroidsForm />
          </div>
          <div className={cn('h-[50%]', 'w-full')}>
            <AsteroidsList data={sortedData} />
          </div>
        </div>
      </div>
    </AsteroidsPageProvider>
  );
};

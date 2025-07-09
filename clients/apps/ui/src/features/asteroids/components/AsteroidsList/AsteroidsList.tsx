import { measureElementFirefoxFix } from '@/utils';
import { cn, Container } from '@ne/components';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';
import { useAsteroidsContext } from '../AsteroidsPage/AsteroidsPage.context';
import type { AsteroidsListProps } from './AsteroidsList.types';
import { AsteroidsListItem, AsteroidsListItemSkeleton } from './components';

export const AsteroidsList = ({ data = [] }: AsteroidsListProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { isActive, unit } = useAsteroidsContext();

  const listItems =
    isActive && !data.length ? Array.from({ length: 10 }) : data;

  const { getVirtualItems, getTotalSize, measureElement } = useVirtualizer({
    count: listItems.length,
    estimateSize: () => 12,
    getScrollElement: () => containerRef.current,
    measureElement: measureElementFirefoxFix(),
    overscan: 5,
  });

  const virtualItems = getVirtualItems();

  return (
    <Container
      ref={containerRef}
      className={cn(
        'h-full',
        'w-full',
        'overflow-auto',
        'contain-strict',
        'block'
      )}
    >
      <div
        className={cn('w-full', 'relative', 'flex', 'flex-col', 'gap-3')}
        style={{ height: getTotalSize() }}
      >
        {virtualItems.map((virtualItem) => {
          const item = data?.[virtualItem.index];

          const [close_approach_data] = item?.close_approach_data ?? [];

          const diameter = item?.estimated_diameter?.[unit];
          const velocity =
            // @ts-expect-error Unit is string at this point
            close_approach_data?.relative_velocity?.[`${unit}_per_hour`];
          // @ts-expect-error Unit is string at this point
          const distance = close_approach_data?.miss_distance?.[unit];

          return (
            <div
              key={virtualItem.index}
              ref={(node) => measureElement(node)}
              data-index={virtualItem.index}
              className={cn('shadow-lg', 'absolute', 'py-2', 'w-full')}
              style={{
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              {isActive ? (
                <AsteroidsListItemSkeleton />
              ) : (
                <AsteroidsListItem
                  name={item.name}
                  date={close_approach_data.close_approach_date}
                  diameter={
                    diameter
                      ? ([
                          diameter.estimated_diameter_min,
                          diameter.estimated_diameter_max,
                        ] as [number, number])
                      : undefined
                  }
                  velocity={velocity}
                  distance={distance}
                  externalUrl={item.nasa_jpl_url}
                  hazardous={item.is_potentially_hazardous_asteroid}
                  orbiting={close_approach_data.orbiting_body}
                />
              )}
            </div>
          );
        })}
      </div>
    </Container>
  );
};

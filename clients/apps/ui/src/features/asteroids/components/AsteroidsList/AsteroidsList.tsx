import { measureElementFirefoxFix } from '@/utils';
import { cn, Container, useIsTouch } from '@ne/components';
import { useUpdateEffect } from '@react-hookz/web';
import {
  elementScroll,
  useVirtualizer,
  type VirtualizerOptions,
} from '@tanstack/react-virtual';
import { useCallback, useRef } from 'react';
import { useAsteroidsContext } from '../AsteroidsPage/AsteroidsPage.context';
import type { AsteroidsListProps } from './AsteroidsList.types';
import { easeInOutQuint } from './AsteroidsList.utils';
import { AsteroidsListItem, AsteroidsListItemSkeleton } from './components';

export const AsteroidsList = ({ data = [] }: AsteroidsListProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollingRef = useRef<number>(null);

  const isTouch = useIsTouch();

  const { isActive, unit, setFocusedId, focusedId } = useAsteroidsContext();

  const listItems =
    isActive && !data.length ? Array.from({ length: 10 }) : data;

  /**
   * @see https://tanstack.com/virtual/latest/docs/framework/react/examples/smooth-scroll
   */
  const scrollToFn: VirtualizerOptions<any, any>['scrollToFn'] = useCallback(
    (offset, canSmooth, instance) => {
      const duration = 1000;
      const start = containerRef.current?.scrollTop || 0;
      const startTime = (scrollingRef.current = Date.now());

      const run = () => {
        if (scrollingRef.current !== startTime) return;
        const now = Date.now();
        const elapsed = now - startTime;
        const progress = easeInOutQuint(Math.min(elapsed / duration, 1));
        const interpolated = start + (offset - start) * progress;

        if (elapsed < duration) {
          elementScroll(interpolated, canSmooth, instance);
          requestAnimationFrame(run);
        } else {
          elementScroll(interpolated, canSmooth, instance);
        }
      };

      requestAnimationFrame(run);
    },
    []
  );

  const { getVirtualItems, getTotalSize, measureElement, scrollToIndex } =
    useVirtualizer({
      count: listItems.length,
      estimateSize: () => 12,
      getScrollElement: () => containerRef.current,
      measureElement: measureElementFirefoxFix(),
      overscan: 5,
      ...(!isTouch && { scrollToFn }),
    });

  const virtualItems = getVirtualItems();

  useUpdateEffect(() => {
    if (focusedId) {
      const index = data.findIndex(({ id }) => id === focusedId);

      if (index >= 0) {
        scrollToIndex(data.findIndex(({ id }) => id === focusedId));
      }
    }
  }, [focusedId, data]);

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
                  className={cn(focusedId === item.id && 'brightness-150')}
                  onClick={() => setFocusedId(item.id)}
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

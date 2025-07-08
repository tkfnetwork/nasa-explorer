import { cn } from '@/_shadcn/lib/utils';
import { useMeasure } from '@react-hookz/web';
import { forwardRef, RefObject } from 'react';
import BaseGlobe from 'react-globe.gl';
import globe from './assets/earth-blue-marble.jpg';
import type { GlobeProps, GlobeRef } from './Globe.types';

export const Globe = forwardRef<GlobeRef, GlobeProps>(
  ({ className, ...props }, ref) => {
    const [container, containerRef] = useMeasure<HTMLDivElement>();

    return (
      <div ref={containerRef} className={cn('w-full', 'h-full', className)}>
        <BaseGlobe
          ref={ref as RefObject<GlobeRef>}
          globeImageUrl={globe}
          {...props}
          width={container?.width}
          height={container?.height}
        />
      </div>
    );
  }
);

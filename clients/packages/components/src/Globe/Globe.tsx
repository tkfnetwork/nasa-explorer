import BaseGlobe from 'react-globe.gl';
import globe from './assets/earth-blue-marble.jpg';
import type { GlobeProps } from './Globe.types';
import { cn } from '@/_shadcn/lib/utils';
import { useMeasure } from '@react-hookz/web';

export const Globe = ({ className, ...props }: GlobeProps) => {
  const [container, containerRef] = useMeasure<HTMLDivElement>();

  return (
    <div ref={containerRef} className={cn('w-full', 'h-full', className)}>
      <BaseGlobe
        globeImageUrl={globe}
        {...props}
        width={container?.width}
        height={container?.height}
      />
    </div>
  );
};

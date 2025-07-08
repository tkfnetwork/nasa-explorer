import { Globe, type GlobeRef } from '@ne/components';
import { useMemo, useRef } from 'react';
import { useAteroidsPositions } from '../../queries';
import type { AsteroidsGlobeProps } from './AsteroidsGlobe.types';
import type { ParticlePosition } from '../../types';

export const AsteroidsGlobe = ({ ids }: AsteroidsGlobeProps) => {
  const globeRef = useRef<GlobeRef>(null);
  const positionsMap = useAteroidsPositions(ids);

  const particlesData = useMemo(
    () => [...positionsMap.values()].map(({ geo }) => geo),
    [[...positionsMap.keys()]]
  );

  return (
    <Globe
      ref={globeRef}
      globeOffset={[-250, 0]}
      particlesData={particlesData}
      particlesList={(obj) => {
        return [obj];
      }}
      particleLat="lat"
      particleLng="lng"
      particleAltitude="alt"
      particlesColor={(d) => (d as ParticlePosition).color}
      particlesSize={(d) => (d as ParticlePosition).size}
    />
  );
};

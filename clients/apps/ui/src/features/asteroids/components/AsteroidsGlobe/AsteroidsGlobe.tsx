import { Globe, type GlobeRef } from '@ne/components';
import { useMountEffect } from '@react-hookz/web';
import { useMemo, useRef } from 'react';
import { useAteroidsPositions } from '../../queries';
import { EARTH_RADIUS } from '../../utils';
import type { AsteroidsGlobeProps } from './AsteroidsGlobe.types';

export const AsteroidsGlobe = ({ ids }: AsteroidsGlobeProps) => {
  const globeRef = useRef<GlobeRef>(null);
  const positionsMap = useAteroidsPositions(ids);

  const particlesData = useMemo(
    () => [...positionsMap.values()].map(({ geo }) => geo),
    [[...positionsMap.keys()]]
  );

  useMountEffect(() => {
    const globe = globeRef.current;
    if (!globe) return;

    const camera = globe.camera();
    const controls = globe.controls();

    camera.position.set(0, 0, EARTH_RADIUS * 0.5);
    controls.target.set(0, 0, 0);
    controls.update();
  });

  return (
    <Globe
      ref={globeRef}
      globeOffset={[-250, 0]}
      particlesData={particlesData}
      particlesList={(obj) => [obj]}
      particleLat="lat"
      particleLng="lng"
      particleAltitude="alt"
      particlesColor="color"
      particlesSize="size"
    />
  );
};

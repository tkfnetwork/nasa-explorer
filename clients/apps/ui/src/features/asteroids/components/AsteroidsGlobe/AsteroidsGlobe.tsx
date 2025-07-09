import { Globe, type GlobeRef } from '@ne/components';
import { useMountEffect } from '@react-hookz/web';
import { noop } from 'lodash';
import { useEffect, useMemo, useRef } from 'react';
import { useAsteroidsPositionsWebsocket } from '../../queries';
import type { ParticlePosition } from '../../types';
import { EARTH_RADIUS } from '../../utils';
import { useAsteroidsContext } from '../AsteroidsPage/AsteroidsPage.context';
import type { AsteroidsGlobeProps } from './AsteroidsGlobe.types';
import { getRandomTexture } from './AsteroidsGlobe.utils';

export const AsteroidsGlobe = ({ ids }: AsteroidsGlobeProps) => {
  const globeRef = useRef<GlobeRef>(null);

  const { focusedId, setFocusedId } = useAsteroidsContext();

  const positionsMap = useAsteroidsPositionsWebsocket(ids);
  const keys = [...positionsMap.keys()];

  const particlesData = useMemo(
    () =>
      [...positionsMap.values()].map(({ id, geo, name }) => [
        { ...geo, id, name, texture: getRandomTexture() },
      ]),
    [JSON.stringify(keys)]
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

  useEffect(() => {
    const globe = globeRef.current;
    if (!globe || !focusedId || !positionsMap.has(focusedId)) return;
    const position = positionsMap.get(focusedId)!;

    globe.pointOfView(
      { ...position.geo, altitude: position.geo.alt + 0.5 },
      1000
    );
  }, [focusedId, positionsMap]);

  return (
    <Globe
      ref={globeRef}
      globeOffset={[-250, 0]}
      lineHoverPrecision={20}
      particleLat="lat"
      particleLng="lng"
      particleAltitude="alt"
      particlesData={particlesData}
      particlesTexture={(particle) =>
        (particle as ParticlePosition[]).at(0)!.texture!
      }
      particlesColor={(particle) =>
        (particle as ParticlePosition[]).at(0)?.color ?? 'grey'
      }
      particlesSize={(particle) =>
        (particle as ParticlePosition[]).at(0)?.size ?? 5
      }
      // Noop is needed to enable hover
      onParticleHover={noop}
      onParticleClick={(s) => {
        setFocusedId((s as ParticlePosition).id);
      }}
    />
  );
};

import type { NearEarthObjectWithOrbital } from '@/api/generated';
import { useDeepCompareEffect, useMap } from '@react-hookz/web';
import { useEffect } from 'react';
import useWebSocket from 'react-use-websocket';
import type { ParticlePosition } from '../types';
import { itemToParticle } from '../utils/positioning';
import { getRandomTexture } from '../utils';
import { API_BASE_URL } from '@/config';

const getWsUrl = (pathname?: string): string => {
  const url = new URL(API_BASE_URL);

  url.protocol = url.protocol.replace(/^https?:\/\//, (m) =>
    m === 'https' ? 'wss' : 'ws'
  );

  if (pathname) {
    url.pathname = pathname;
  }

  return url.toString();
};

export type NearEarthObjectWithGeo = NearEarthObjectWithOrbital & {
  geo: ParticlePosition;
};

export const useAsteroidsPositionsWebsocket = (ids: string[]) => {
  const positionsMap = useMap<string, NearEarthObjectWithGeo>();
  const { sendJsonMessage, lastJsonMessage } =
    useWebSocket<NearEarthObjectWithOrbital>(getWsUrl('/asteroids/positions'));

  useDeepCompareEffect(() => {
    positionsMap.clear();
    sendJsonMessage(ids);
  }, [ids, sendJsonMessage, positionsMap]);

  useEffect(() => {
    Object.entries(lastJsonMessage ?? {}).forEach(([id, item]) => {
      positionsMap.set(id, {
        ...(item as NearEarthObjectWithOrbital),
        geo: {
          ...itemToParticle(item as NearEarthObjectWithOrbital),
          texture: getRandomTexture(),
        },
      });
    });
  }, [positionsMap, lastJsonMessage]);

  return positionsMap;
};

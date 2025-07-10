import { Globe } from '@ne/components';
import { cleanup, render } from '@testing-library/react';
import { afterEach, beforeEach, expect, test, vi, type Mock } from 'vitest';
import { AsteroidsGlobe } from './AsteroidsGlobe';
import type { AsteroidsGlobeProps } from './AsteroidsGlobe.types';
import { faker } from '@faker-js/faker';
import { useAsteroidsPositionsWebsocket } from '../../queries';

vi.mock('@ne/components', () => ({
  Globe: vi.fn(),
}));

vi.mock('../../queries', () => ({
  useAsteroidsPositionsWebsocket: vi.fn(() => new Map()),
}));

vi.mock('../AsteroidsPage/AsteroidsPage.context', () => ({
  useAsteroidsContext: vi.fn(() => ({
    dates: [],
    unit: undefined,
  })),
}));

const useAsteroidsPositionsWebsocketMock =
  useAsteroidsPositionsWebsocket as Mock;

const renderElement = (props: AsteroidsGlobeProps) => (
  <AsteroidsGlobe {...props} />
);
const renderComponent = (props: AsteroidsGlobeProps) =>
  render(renderElement(props));

beforeEach(() => {
  vi.resetAllMocks();
});

afterEach(() => {
  cleanup();
});

test('Globe is passed the correct data', () => {
  const data = {
    id: faker.string.numeric(),
    name: faker.internet.username(),
    geo: {
      lat: faker.location.latitude(),
      lng: faker.location.longitude(),
      alt: faker.number.float(),
    },
  };
  useAsteroidsPositionsWebsocketMock.mockReturnValue(
    new Map([[data.id, data]])
  );
  renderComponent({ ids: [data.id] });

  expect(Globe).toHaveBeenCalledWith(
    {
      globeOffset: [-250, 0],
      lineHoverPrecision: 20,
      onParticleClick: expect.any(Function),
      onParticleHover: expect.any(Function),
      particleAltitude: 'alt',
      particleLat: 'lat',
      particleLng: 'lng',
      particlesColor: expect.any(Function),
      particlesData: [
        [
          {
            ...data.geo,
            id: data.id,
            name: data.name,
          },
        ],
      ],
      particlesSize: expect.any(Function),
      particlesTexture: expect.any(Function),
      ref: {
        current: null,
      },
    },

    undefined
  );
});

import type { Meta, StoryObj } from '@storybook/react-vite';
import { Globe } from './Globe';
import { particleFactory } from './_mocks';

type Story = StoryObj<typeof Globe>;

export default {
  title: 'Mapping/Globe',
  component: Globe,
} as Meta<typeof Globe>;

export const Primary: Story = {
  args: {
    particlesData: particleFactory.buildList(100).map((o) => [o]),
    particleLat: 'lat',
    particleLng: 'lng',
    particleAltitude: 'alt',
    lineHoverPrecision: 10,
    particlesSize: (o) => {
      console.log(o);
      return o.at(0).size;
    },
    onParticleHover: (p) => console.log('hover', p),
    onParticleClick: (p, evt, coords) => console.log('click', p, coords),
  },
};

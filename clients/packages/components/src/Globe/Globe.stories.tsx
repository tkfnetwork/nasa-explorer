import type { Meta, StoryObj } from '@storybook/react-vite';
import { Globe } from './Globe';

type Story = StoryObj<typeof Globe>;

export default {
  title: 'Mapping/Globe',
  component: Globe,
} as Meta<typeof Globe>;

export const Primary: Story = {
  args: {},
};

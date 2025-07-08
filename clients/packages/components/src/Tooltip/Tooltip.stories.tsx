import { Meta, StoryObj } from '@storybook/react-vite';
import { Tooltip } from './Tooltip';

type Story = StoryObj<typeof Tooltip>;

export default {
  title: 'Tooltip',
  component: Tooltip,
} as Meta<typeof Tooltip>;

export const Primary: Story = {
  args: {},
};

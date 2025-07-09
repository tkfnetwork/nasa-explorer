import { Meta, StoryObj } from '@storybook/react-vite';
import { Skeleton } from './Skeleton';

type Story = StoryObj<typeof Skeleton>;

export default {
  title: 'Elements/Skeleton',
  component: Skeleton,
} as Meta<typeof Skeleton>;

export const Primary: Story = {
  args: {},
};

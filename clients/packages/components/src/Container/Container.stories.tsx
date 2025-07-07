import { Meta, StoryObj } from '@storybook/react-vite';
import { Container } from './Container';

type Story = StoryObj<typeof Container>;

export default {
  title: 'Layout/Container',
  component: Container,
} as Meta<typeof Container>;

export const Primary: Story = {
  args: {
    children: 'Content',
  },
};

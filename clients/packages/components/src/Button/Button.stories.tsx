import { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

type Story = StoryObj<typeof Button>;

export default {
  title: 'Form/Button',
  component: Button,
  args: {
    children: 'Button',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'destructive',
        'outline',
        'secondary',
        'ghost',
        'link',
      ],
    },
  },
} as Meta<typeof Button>;

export const Primary: Story = {
  args: {},
};

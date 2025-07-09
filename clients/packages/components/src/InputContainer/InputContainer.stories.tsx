import type { Meta, StoryObj } from '@storybook/react-vite';

import { InputContainer } from './InputContainer';

type Story = StoryObj<typeof InputContainer>;

export default {
  title: 'Form/InputContainer',
  component: InputContainer,
} as Meta<typeof InputContainer>;

export const Primary: Story = {
  args: {
    children: 'Faux input',
  },
};

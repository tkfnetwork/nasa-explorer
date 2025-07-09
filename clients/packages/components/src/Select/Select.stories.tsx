import type { Meta, StoryObj } from '@storybook/react-vite';

import { Select } from './Select';
import { selectValueFactory } from './_mocks';

type Story = StoryObj<typeof Select>;

export default {
  title: 'Form/Select',
  component: Select,
  args: {
    placeholder: 'Select an option',
  },
} as Meta<typeof Select>;

export const Primary: Story = {
  args: {
    options: [{ options: selectValueFactory.buildList(5) }],
  },
};

export const Grouped: Story = {
  args: {
    options: [
      { label: 'Group 1', options: selectValueFactory.buildList(5) },
      { label: 'Group 2', options: selectValueFactory.buildList(5) },
    ],
  },
};

import type { Meta, StoryObj } from '@storybook/react-vite';

import { DatePicker } from './DatePicker';

type Story = StoryObj<typeof DatePicker>;

export default {
  title: 'Form/DatePicker',
  component: DatePicker,
  args: {
    open: false,
  },
} as Meta<typeof DatePicker>;

export const Basic: Story = {
  args: {},
};

export const Range: Story = {
  args: {
    range: true,
    placeholder: ['From', 'To'],
  },
};

export const WithTime: Story = {
  args: {
    timeSelector: true,
  },
};

export const Dismissable: Story = {
  args: {
    range: true,
    placeholder: ['From', 'To'],
    dismissable: true,
  },
};

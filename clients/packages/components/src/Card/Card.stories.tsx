import { Meta, StoryObj } from '@storybook/react-vite';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './Card';

type Story = StoryObj<typeof Card>;

export default {
  title: 'Content/Card',
  component: Card,
} as Meta<typeof Card>;

export const Primary: Story = {
  args: {
    children: [
      <CardHeader key="header">
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
        <CardAction>Card Action</CardAction>
      </CardHeader>,
      <CardContent key="content">
        <p>Card Content</p>
      </CardContent>,
      <CardFooter key="footer">
        <p>Card Footer</p>
      </CardFooter>,
    ],
  },
};

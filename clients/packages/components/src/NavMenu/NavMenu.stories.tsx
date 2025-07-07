import { Meta, StoryObj } from '@storybook/react-vite';
import { NavMenu } from './NavMenu';

type Story = StoryObj<typeof NavMenu>;

export default {
  title: 'Navigation/NavMenu',
  component: NavMenu,
} as Meta<typeof NavMenu>;

export const Primary: Story = {
  args: {
    children: [
      ...Array.from({ length: 4 }).map((_, i) => (
        <NavMenu.Item key={i}>
          <NavMenu.Link asChild active={i === 0}>
            <a href="#" onClick={(e) => e.preventDefault()}>
              Item {i + 1}
            </a>
          </NavMenu.Link>
        </NavMenu.Item>
      )),
      <NavMenu.Item key="menu">
        <NavMenu.Trigger>Menu Item</NavMenu.Trigger>
        <NavMenu.Content>Menu Dropdown Item Content</NavMenu.Content>
      </NavMenu.Item>,
    ],
  },
};

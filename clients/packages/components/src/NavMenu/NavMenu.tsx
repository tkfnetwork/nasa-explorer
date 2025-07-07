import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/_shadcn/components/ui/navigation-menu';
import { NavMenuProps } from './NavMenu.types';

export const NavMenu = ({ children }: NavMenuProps) => (
  <NavigationMenu>
    <NavigationMenuList>{children}</NavigationMenuList>
  </NavigationMenu>
);

NavMenu.Item = NavigationMenuItem;
NavMenu.Trigger = NavigationMenuTrigger;
NavMenu.Content = NavigationMenuContent;
NavMenu.Link = NavigationMenuLink;

import { IconType } from 'react-icons';

export type SidebarItemType = {
  label: string;
  href?: string;
  icon: IconType;
  children?: SidebarItemType[];
};

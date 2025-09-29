import { SidebarItemType } from './Sidebar.types';
import {
  MdDashboard,
  MdCategory,
  MdShoppingCart,
  MdPeople,
  MdBarChart,
  MdSettings,
  MdComment,
} from 'react-icons/md';
import { FaBox } from 'react-icons/fa';
export const sidebarItems: SidebarItemType[] = [
  { label: 'داشبورد', href: '/dashboard', icon: MdDashboard },
  { label: 'محصولات', href: '/products', icon: FaBox },
  { label: 'دسته‌بندی‌ها', href: '/categories', icon: MdCategory },
  { label: 'کامنت‌ها', href: '/comments', icon: MdComment },
  { label: 'سفارش‌ها', href: '/orders', icon: MdShoppingCart },
  { label: 'مشتریان', href: '/customers', icon: MdPeople },
  { label: 'گزارش‌ها', href: '/reports', icon: MdBarChart },
  { label: 'تنظیمات', href: '/settings', icon: MdSettings },
];

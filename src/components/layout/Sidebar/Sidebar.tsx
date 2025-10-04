'use client';
import { FC, useState } from 'react';
import { sidebarItems } from './Sidebar.config';
import { usePathname } from 'next/navigation';
import type { SidebarItemType } from './Sidebar.types';
import Link from 'next/link';
import { SidebarToggle } from './SidebarToggle';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';

export const Sidebar: FC = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState<string[]>([]);

  const toggleMenu = (label: string) => {
    setOpenMenus((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label],
    );
  };

  const renderItem = (item: SidebarItemType) => {
    const isActive = item.href ? pathname.startsWith(item.href) : false;

    // اگر آیتم children داشته باشه
    if (item.children) {
      const isExpanded = openMenus.includes(item.label);
      return (
        <div key={item.label} className="space-y-1">
          <button
            onClick={() => toggleMenu(item.label)}
            className={`w-full flex items-center justify-between px-4 py-2 rounded transition ${
              isExpanded
                ? 'bg-accent text-accent-foreground'
                : 'hover:bg-accent'
            }`}
          >
            <div className="flex items-center gap-3">
              <item.icon size={20} />
              <span>{item.label}</span>
            </div>
            {isExpanded ? <MdExpandLess /> : <MdExpandMore />}
          </button>
          {isExpanded && (
            <div className="ml-6 space-y-1">
              {item.children.map((child) => {
                const childActive = pathname.startsWith(child.href || '');
                return (
                  <Link
                    key={child.href}
                    href={child.href!}
                    className={`flex items-center gap-3 px-4 py-2 rounded transition ${
                      childActive
                        ? 'bg-accent text-accent-foreground'
                        : 'hover:bg-accent'
                    }`}
                  >
                    <child.icon size={18} />
                    <span>{child.label}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      );
    }

    // آیتم ساده
    return (
      <Link
        key={item.href}
        href={item.href!}
        className={`flex items-center gap-3 px-4 py-2 rounded transition ${
          isActive ? 'bg-accent text-accent-foreground' : 'hover:bg-accent'
        }`}
      >
        <item.icon size={20} />
        <span>{item.label}</span>
      </Link>
    );
  };

  return (
    <>
      {/* دکمه باز/بسته کردن فقط در موبایل */}
      <div className="p-2 md:hidden">
        <SidebarToggle onClick={() => setIsOpen(true)} />
      </div>
      {/* بک‌دراپ برای موبایل */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* سایدبار */}
      <aside
        className={`bg-sidebar text-sidebar-foreground flex flex-col transform transition-all duration-300 z-50
          md:translate-x-0 md:static md:h-auto
          ${isOpen ? 'fixed top-0 right-0 w-64 h-full' : 'fixed top-0 right-0 w-64 h-full translate-x-full'}
          md:w-64`}
      >
        <div className="p-4 text-lg font-bold border-b border-sidebar-border ml-5">
          پنل مدیریت
        </div>
        <nav className="flex-1 p-2 space-y-1">
          {sidebarItems.map(renderItem)}
        </nav>
      </aside>
    </>
  );
};

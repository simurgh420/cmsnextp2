'use client';
import { FC, useState } from 'react';
import { sidebarItems } from './Sidebar.config';
import { usePathname } from 'next/navigation';

import type { SidebarItemType } from './Sidebar.types';
import Link from 'next/link';
import { SidebarToggle } from './SidebarToggle';

export const Sidebar: FC = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
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
        className={`bg-gray-900 text-white flex flex-col transform transition-transform duration-300 z-50
    md:translate-x-0 md:static md:h-auto
    ${isOpen ? 'fixed top-0 right-0 w-64 h-full' : 'fixed top-0 right-0 w-64 h-full translate-x-full'}
    md:w-64`}
      >
        <div className="p-4 text-lg font-bold border-b border-gray-700 ml-5">
          پنل مدیریت
        </div>
        <nav className="flex-1 p-2 space-y-1">
          {sidebarItems.map((item: SidebarItemType) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2 rounded transition ${
                  isActive ? 'bg-gray-800 text-blue-400' : 'hover:bg-gray-800'
                }
                          }`}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

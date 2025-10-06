'use client';

import React, { useState } from 'react';
import { Sidebar, SidebarBody, SidebarLink } from '@/components/ui/sidebar';
import { sidebarItems } from '@/components/layout/Sidebar/Sidebar.config';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';

export default function AppSidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState<string[]>([]);

  const toggleMenu = (label: string) => {
    setOpenMenus((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label],
    );
  };

  const renderItem = (item: any) => {
    const isActive = item.href ? pathname.startsWith(item.href) : false;

    // آیتم با children
    if (item.children) {
      const isExpanded = openMenus.includes(item.label);
      return (
        <div key={item.label} className="space-y-1">
          <button
            type="button"
            onClick={() => toggleMenu(item.label)}
            className={cn(
              'w-full flex items-center justify-between px-4 py-2 rounded transition',
              isExpanded
                ? 'bg-accent text-accent-foreground'
                : 'hover:bg-accent',
            )}
          >
            <div className="flex items-center gap-2">
              <item.icon className="h-5 w-5 shrink-0" />
              <span>{item.label}</span>
            </div>
            {isExpanded ? <MdExpandLess /> : <MdExpandMore />}
          </button>

          {isExpanded && (
            <div className="space-y-1 ps-6">
              {item.children.map((child: any) => {
                const childActive = pathname.startsWith(child.href || '');
                return (
                  <SidebarLink
                    key={child.href}
                    link={{
                      label: child.label,
                      href: child.href,
                      icon: <child.icon className="h-4 w-4 shrink-0" />,
                    }}
                    className={cn(
                      childActive
                        ? 'bg-accent text-accent-foreground'
                        : 'hover:bg-accent',
                    )}
                  />
                );
              })}
            </div>
          )}
        </div>
      );
    }

    // آیتم ساده
    return (
      <SidebarLink
        key={item.href}
        link={{
          label: item.label,
          href: item.href,
          icon: <item.icon className="h-5 w-5 shrink-0" />,
        }}
        className={cn(
          isActive ? 'bg-accent text-accent-foreground' : 'hover:bg-accent',
        )}
      />
    );
  };

  return (
    <div className="flex w-full h-screen border-r border-neutral-200 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800">
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-y-auto">
            <div className="mt-8 flex flex-col gap-2">
              {sidebarItems.map(renderItem)}
            </div>
          </div>
        </SidebarBody>
      </Sidebar>
      <main className="flex-1">{children}</main>
    </div>
  );
}

'use client';

import { FC, useState } from 'react';
import { NotificationDropdown } from '@/components/notifications/notification-dropdown';
import { Button } from '@/components/ui';
import {
  useUser,
  UserButton,
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
} from '@clerk/nextjs';
import Switch from '@/components/styled-components/Switch';

export const Header: FC = () => {
  const [expanded, setExpanded] = useState(false);
  const { user } = useUser();

  return (
    <header className="w-full bg-gray-100 dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700 px-4 py-3 flex items-center justify-between rtl transition-colors duration-300">
      {/* سمت چپ: آیکون‌ها و جستجو */}
      <div className="flex items-center gap-4">
        <Switch />
        <NotificationDropdown />
        <div className="flex items-center gap-2">
          <div
            className={`flex items-center gap-2 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-gray-50 dark:bg-neutral-900 px-3 py-2 shadow-sm transition-all duration-300 overflow-hidden ${
              expanded ? 'w-72' : 'w-0'
            }`}
          >
            <input
              type="text"
              placeholder="جستجو در پنل..."
              className={`flex-1 bg-transparent text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-500 dark:placeholder:text-neutral-400 outline-none transition-opacity duration-300 ${
                expanded ? 'opacity-100' : 'opacity-0'
              }`}
              onBlur={() => setExpanded(false)}
              autoFocus={expanded}
            />
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setExpanded(!expanded)}
          >
            جستجو
          </Button>
        </div>
      </div>

      {/* سمت راست: پروفایل کاربر */}
      <div className="flex items-center gap-3">
        <SignedIn>
          <UserButton afterSwitchSessionUrl="/" />
          <div className="text-right">
            <div className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
              {user?.fullName || user?.username || 'کاربر'}
            </div>
            <div className="text-xs text-neutral-500 dark:text-neutral-400">
              حساب کاربری
            </div>
          </div>
        </SignedIn>
        <SignedOut>
          <SignInButton>
            <Button size="sm" variant="outline">
              ورود
            </Button>
          </SignInButton>
          <SignUpButton>
            <Button size="sm" variant="outline">
              ثبت‌نام
            </Button>
          </SignUpButton>
        </SignedOut>
      </div>
    </header>
  );
};

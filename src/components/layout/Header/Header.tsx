'use client';

import { FC } from 'react';
import { MdShuffle, MdNotifications } from 'react-icons/md';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

export const Header: FC = () => {
  return (
    <header className="w-full bg-white border-b px-4 py-3 flex items-center justify-between rtl">
      {/* سمت چپ: آیکون‌ها و جستجو */}
      <div className="flex items-center gap-4">
        <MdShuffle className="text-gray-600" size={22} />
        <MdNotifications className="text-gray-600" size={22} />
        <div className="flex items-center gap-2 bg-gray-100 rounded px-2 py-1">
          <input
            type="text"
            placeholder="جستجو در پنل..."
            className="bg-transparent outline-none text-sm text-gray-700 placeholder:text-gray-500"
          />
          <Button size="sm" variant="secondary">
            جستجو
          </Button>
        </div>
      </div>

      {/* سمت راست: پروفایل کاربر */}
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src="/avatar.jpg" alt="محمدرضا" />
          <AvatarFallback>MR</AvatarFallback>
        </Avatar>
        <div className="text-right">
          <div className="text-sm font-medium text-gray-800">محمدرضا</div>
          <div className="text-xs text-gray-500">مدیر سیستم</div>
        </div>
      </div>
    </header>
  );
};

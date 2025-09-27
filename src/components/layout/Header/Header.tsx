'use client';

import { FC, useState } from 'react';
import { MdShuffle, MdNotifications } from 'react-icons/md';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

export const Header: FC = () => {
  const [expanded, setExpanded] = useState(false);
  return (
    <header className="w-full bg-white border-b px-4 py-3 flex items-center justify-between rtl">
      {/* سمت چپ: آیکون‌ها و جستجو */}
      <div className="flex items-center gap-4">
        <MdShuffle className="text-gray-600" size={22} />
        <MdNotifications className="text-gray-600" size={22} />
        <div className="flex items-center gap-2">
          <div
            className={`flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 shadow-sm transition-all duration-300 overflow-hidden ${
              expanded ? 'w-72' : 'w-0'
            }`}
          >
            <input
              type="text"
              placeholder="جستجو در پنل..."
              className={`flex-1 bg-transparent text-sm text-gray-700 placeholder:text-gray-400 outline-none transition-opacity duration-300 ${
                expanded ? 'opacity-100' : 'opacity-0'
              }`}
              onBlur={() => setExpanded(false)} // وقتی فوکوس از دست رفت دوباره بسته بشه
              autoFocus={expanded}
            />
          </div>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => setExpanded(!expanded)}
          >
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

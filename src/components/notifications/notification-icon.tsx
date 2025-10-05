// src/components/notifications/notification-icon.tsx
'use client';

import { MdNotifications } from 'react-icons/md';
import { useUnreadCount } from '@/stores/notifications';
import { cn } from '@/lib/utils';

export function NotificationIcon({ className }: { className?: string }) {
  const unread = useUnreadCount();

  return (
    <div
      className={cn('relative inline-flex items-center', className)}
      aria-label="Notifications"
    >
      <MdNotifications className="text-muted-foreground" size={22} />
      {unread > 0 && (
        <span
          className="absolute -top-1 -right-1 rounded-full bg-destructive text-destructive-foreground text-[10px] font-medium min-w-[16px] h-[16px] px-1 flex items-center justify-center"
          aria-label={`${unread} unread notifications`}
        >
          {unread}
        </span>
      )}
    </div>
  );
}

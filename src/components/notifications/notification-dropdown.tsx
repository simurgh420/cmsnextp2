// src/components/notifications/notification-dropdown.tsx
'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MdNotifications } from 'react-icons/md';
import {
  useNotifications,
  useUnreadCount,
  useNotificationsList,
} from '@/stores/notifications';
import { formatDistanceToNow } from 'date-fns';
import { faIR } from 'date-fns/locale';

export function NotificationDropdown() {
  const items = useNotificationsList();
  const unread = useUnreadCount();
  const { markRead, remove, clear } = useNotifications();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative px-2">
          <MdNotifications size={22} className="text-muted-foreground" />
          {unread > 0 && (
            <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-[10px] rounded-full min-w-[16px] h-[16px] px-1 flex items-center justify-center">
              {unread}
            </span>
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-[320px]">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>نوتیفیکیشن‌ها</span>
          <button
            onClick={() => clear()}
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            پاک‌سازی
          </button>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {items.length === 0 ? (
          <div className="py-6 text-center text-sm text-muted-foreground">
            نوتیفیکیشنی وجود ندارد
          </div>
        ) : (
          <div className="max-h-[360px] overflow-auto">
            {items.map((n) => (
              <DropdownMenuItem
                key={n.id}
                className="flex items-start gap-3 py-3"
                onClick={() => markRead(n.id)}
              >
                <div
                  className={`mt-1 h-2 w-2 rounded-full ${
                    n.read ? 'bg-muted' : 'bg-primary'
                  }`}
                />
                <div className="flex-1">
                  {n.title && (
                    <div className="text-sm font-medium">{n.title}</div>
                  )}
                  <div className="text-sm text-muted-foreground">
                    {n.message}
                  </div>
                  <div className="mt-1 text-[11px] text-muted-foreground">
                    {formatDistanceToNow(n.createdAt, {
                      addSuffix: true,
                      locale: faIR,
                    })}
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    remove(n.id);
                  }}
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  حذف
                </button>
              </DropdownMenuItem>
            ))}
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

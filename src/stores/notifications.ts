'use client';
import { NotificationType } from '@/lib/types';
import { create } from 'zustand';


export type NotificationItem = {
  id: string;
  title?: string;
  message: string;
  type: NotificationType;
  createdAt: number;
  read: boolean;
};

type NotificationsState = {
  items: NotificationItem[];
  add: (
    payload: Omit<NotificationItem, 'id' | 'createdAt' | 'read'>,
  ) => NotificationItem;
  markRead: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
};

export const useNotifications = create<NotificationsState>((set, get) => ({
  items: [],
  add: (payload) => {
    const item: NotificationItem = {
      id: crypto.randomUUID(),
      createdAt: Date.now(),
      read: false,
      ...payload,
    };

    set((s) => ({ items: [item, ...s.items].slice(0, 100) })); // محدودیت ۱۰۰ تا برای کنترل حافظه

    return item;
  },
  markRead: (id) =>
    set((s) => ({
      items: s.items.map((x) => (x.id === id ? { ...x, read: true } : x)),
    })),
  remove: (id) => set((s) => ({ items: s.items.filter((x) => x.id !== id) })),
  clear: () => set({ items: [] }),
}));

// کمک‌توابع انتخابی
export const useUnreadCount = () =>
  useNotifications((s) => s.items.filter((x) => !x.read).length);

export const useNotificationsList = () => useNotifications((s) => s.items);

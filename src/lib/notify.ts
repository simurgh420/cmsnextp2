'use client';

import { toast } from 'sonner';
import { useNotifications } from '@/stores/notifications';
import { NotifyArgs } from './types';

export function useNotify() {
  const add = useNotifications((s) => s.add);

  return ({ title, message, type = 'info' }: NotifyArgs) => {
    // Sonner toast
    const map: Record<string, (msg: string) => void> = {
      success: (m) => toast.success(m),
      error: (m) => toast.error(m),
      info: (m) => toast.message(m),
      warning: (m) => (toast.warning ? toast.warning(m) : toast.message(m)),
    };
    (map[type] ?? toast.message)(message);
    // Persist in store
    add({ title, message, type });
  };
}

'use client';

import { toast } from 'sonner';
import { useNotifications } from '@/stores/notifications';
import { NotifyArgs } from './types';

const toastMap: Record<string, (msg: string) => void> = {
  success: (m) => toast.success(m),
  error: (m) => toast.error(m),
  info: (m) => toast.message(m),
  warning: (m) => (toast.warning ? toast.warning(m) : toast.message(m)),
};
export function useNotify() {
  const add = useNotifications((s) => s.add);
  
  return ({ title, message, type = 'info' }: NotifyArgs) => {
    (toastMap[type] ?? toast.message)(message);
    add({ title, message, type });
  };
}

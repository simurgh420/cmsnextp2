'use client';

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui';
import { Button } from '@/components/ui';
import Link from 'next/link';
import { useTransition } from 'react';
import { commentQuickAction } from '../actions';

import { useNotify } from '@/lib/notify';
import { useAuth } from '@clerk/nextjs';
export default function CommentActions({ id }: { id: string }) {
  const { userId } = useAuth();
  const [isPending, startTransition] = useTransition();
  const notify = useNotify();
  function handleAction(action: 'approve' | 'reject' | 'delete') {
    if (!userId) {
      notify({
        title: 'عدم دسترسی',
        message: 'برای انجام عملیات ابتدا وارد شوید',
        type: 'error',
        duration: 5000,
      });
      return;
    }
    startTransition(async () => {
      try {
        await commentQuickAction(id, action);
        notify({
          title: 'موفقیت',
          message:
            action === 'approve'
              ? '✅کامنت تأیید شد'
              : action === 'reject'
                ? '❌کامنت رد شد'
                : '❌کامنت حذف شد',
          type: 'success',
          duration: 5000,
        });
      } catch (error) {
        notify({
          title: 'خطا',
          message: '❌خطا در انجام عملیات',
          type: 'error',
          duration: Infinity,
        });
      }
    });
  }

  return (
    <div className="flex gap-2">
      {userId ? (
        <Button size="sm" variant="default" asChild>
          <Link href={`/comments/${id}/edit`}>ویرایش</Link>
        </Button>
      ) : (
        <Button
          size="sm"
          variant="default"
          disabled
          className="opacity-50 cursor-not-allowed"
        >
          برای ویرایش وارد شوید
        </Button>
      )}

      <Button
        size="sm"
        variant="default"
        disabled={isPending}
        onClick={() => handleAction('approve')}
      >
        تأیید
      </Button>
      <Button
        size="sm"
        variant="secondary"
        disabled={isPending}
        onClick={() => handleAction('reject')}
      >
        رد
      </Button>
      <Dialog>
        <DialogTrigger asChild>
          <Button size="sm" variant="destructive" disabled={isPending}>
            حذف
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>آیا مطمئنی؟</DialogTitle>
            <DialogDescription>
              این عملیات غیرقابل بازگشت است. کامنت برای همیشه حذف خواهد شد.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="secondary">انصراف</Button>
            <Button
              variant="destructive"
              disabled={isPending}
              onClick={() => handleAction('delete')}
            >
              تأیید حذف
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

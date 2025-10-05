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
import { toast } from 'sonner';

export default function CommentActions({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();
  function handleAction(action: 'approve' | 'reject' | 'delete') {
    startTransition(async () => {
      try {
        await commentQuickAction(id, action);
        toast.success(
          action === 'approve'
            ? 'کامنت تأیید شد'
            : action === 'reject'
              ? 'کامنت رد شد'
              : 'کامنت حذف شد',
        );
      } catch (error) {
        toast.error('خطا در انجام عملیات');
      }
    });
  }

  return (
    <div className="flex gap-2">
      <Button size="sm" variant="default" asChild>
        <Link href={`/comments/${id}/edit`}>ویرایش</Link>
      </Button>
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

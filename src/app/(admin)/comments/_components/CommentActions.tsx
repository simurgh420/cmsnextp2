'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function CommentActions({ id }: { id: string }) {
  async function handleAction(action: 'approve' | 'reject' | 'delete') {
    await fetch(`/api/comments/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action }),
    });
    window.location.reload();
  }

  return (
    <div className="flex gap-2">
      <Button size="sm" variant="default" asChild>
        <Link href={`/comments/${id}/edit`}>ویرایش</Link>
      </Button>
      <Button
        size="sm"
        variant="default"
        onClick={() => handleAction('approve')}
      >
        تأیید
      </Button>
      <Button
        size="sm"
        variant="secondary"
        onClick={() => handleAction('reject')}
      >
        رد
      </Button>
      <Button
        size="sm"
        variant="destructive"
        onClick={() => handleAction('delete')}
      >
        حذف
      </Button>
    </div>
  );
}

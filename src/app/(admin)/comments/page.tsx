import CommentsTable from './_components/CommentsTable';
import Link from 'next/link';
import { Button } from '@/components/ui';
import { getAllCommentsAction } from './actions';
import { Suspense } from 'react';
import { CommentsTableSkeleton } from './_components/comment-table-skeleton';

export default async function CommentsPage() {
  const comments = await getAllCommentsAction();
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">مدیریت کامنت‌ها</h1>
      <Link href="/comments/new">
        <Button>ایجاد کامنت جدید</Button>
      </Link>

      <Suspense fallback={<CommentsTableSkeleton rows={8} />}>
        <CommentsTable comments={comments} />
      </Suspense>
    </div>
  );
}

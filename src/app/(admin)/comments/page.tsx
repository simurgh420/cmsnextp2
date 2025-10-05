import CommentsTable from './_components/CommentsTable';
import Link from 'next/link';
import { Button } from '@/components/ui';
import { getAllCommentsAction } from './actions';
import { Suspense } from 'react';
import { CommentsTableSkeleton } from './_components/comment-table-skeleton';
import { Pagination } from '@/components/Pagination';

export default async function CommentsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; pageSize?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const pageSize = Number(params.pageSize) || 5;
  const { item, totalPages } = await getAllCommentsAction(page, pageSize);
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">مدیریت کامنت‌ها</h1>
      <Link href="/comments/new">
        <Button>ایجاد کامنت جدید</Button>
      </Link>

      <Suspense fallback={<CommentsTableSkeleton rows={8} />}>
        <CommentsTable comments={item} />
        <Pagination page={page} totalPages={totalPages} />
      </Suspense>
    </div>
  );
}

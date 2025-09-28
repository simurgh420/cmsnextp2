import { listAllComments } from '@/application/services/comments';
import CommentsTable from './_components/CommentsTable';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default async function CommentsPage() {
  const comments = await listAllComments();
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">مدیریت کامنت‌ها</h1>
      <Link href="/comments/new">
          <Button>ایجاد کامنت جدید</Button>
        </Link>
      <CommentsTable comments={comments} />
    </div>
  );
}

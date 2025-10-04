// app/comments/loading.tsx
import { Skeleton } from '@/components/ui/skeleton';
import { CommentsTableSkeleton } from './_components/comment-table-skeleton';

export default function CommentsLoading() {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-9 w-32 rounded-md" />
      </div>

      {/* Table Skeleton */}
      <CommentsTableSkeleton rows={8} />
    </div>
  );
}

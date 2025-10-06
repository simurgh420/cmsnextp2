import { Skeleton } from '@/components/ui';

export function CommentsTableSkeleton({ rows = 10 }: { rows?: number }) {
  return (
    <div className="rounded-lg border border-neutral-200 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-900 shadow-sm transition-colors duration-300">
      {/* Header Skeleton */}
      <div className="grid grid-cols-5 gap-4 border-b border-neutral-200 dark:border-neutral-700 p-4">
        <Skeleton className="h-5 w-24 bg-neutral-200 dark:bg-neutral-700" />
        <Skeleton className="h-5 w-24 bg-neutral-200 dark:bg-neutral-700" />
        <Skeleton className="h-5 w-24 bg-neutral-200 dark:bg-neutral-700" />
        <Skeleton className="h-5 w-24 bg-neutral-200 dark:bg-neutral-700" />
        <Skeleton className="h-5 w-24 bg-neutral-200 dark:bg-neutral-700" />
      </div>

      {/* Rows Skeleton */}
      <div className="divide-y divide-neutral-200 dark:divide-neutral-700">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="grid grid-cols-5 gap-4 p-4 transition-colors">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-md bg-neutral-200 dark:bg-neutral-700" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32 bg-neutral-200 dark:bg-neutral-700" />
                <Skeleton className="h-3 w-24 bg-neutral-200 dark:bg-neutral-700" />
              </div>
            </div>
            <Skeleton className="h-4 w-16 bg-neutral-200 dark:bg-neutral-700" />
            <Skeleton className="h-4 w-20 bg-neutral-200 dark:bg-neutral-700" />
            <Skeleton className="h-6 w-16 rounded-full bg-neutral-200 dark:bg-neutral-700" />
            <div className="flex justify-end gap-2">
              <Skeleton className="h-8 w-16 bg-neutral-200 dark:bg-neutral-700" />
              <Skeleton className="h-8 w-16 bg-neutral-200 dark:bg-neutral-700" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

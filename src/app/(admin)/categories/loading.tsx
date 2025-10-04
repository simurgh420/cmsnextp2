// app/categories/loading.tsx
import { Skeleton } from '@/components/ui/skeleton';
import CategorySkeleton from '@/components/categories/categories-skeleton';

export default function CategoriesLoading() {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-9 w-32 rounded-md" />
      </div>

      {/* Table Skeleton */}
      <CategorySkeleton />
    </div>
  );
}

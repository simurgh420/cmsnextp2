// app/products/loading.tsx
import { Skeleton } from '@/components/ui';
import { ProductTableSkeleton } from '@/components/products/product-table-skeleton';

export default function ProductsLoading() {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-48" /> {/* عنوان */}
        <Skeleton className="h-9 w-32 rounded-md" /> {/* دکمه */}
      </div>

      {/* Table Skeleton */}
      <ProductTableSkeleton rows={8} />
    </div>
  );
}

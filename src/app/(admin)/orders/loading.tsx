// app/orders/loading.tsx
import { Skeleton } from '@/components/ui/skeleton';
import { OrderTableSkeleton } from '@/components/orders/order-table-skeleton';

export default function OrdersLoading() {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-9 w-32 rounded-md" />
      </div>

      {/* Table Skeleton */}
      <OrderTableSkeleton rows={8} />
    </div>
  );
}

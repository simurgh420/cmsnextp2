// components/orders/order-table-skeleton.tsx
import { Skeleton } from '@/components/ui';

function TableHeaderSkeleton({ cols }: { cols: number }) {
  return (
    <div
      className={`grid gap-4 border-b p-4`}
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {Array.from({ length: cols }).map((_, i) => (
        <Skeleton key={i} className="h-5 w-24" />
      ))}
    </div>
  );
}

function TableRowSkeleton({ cols }: { cols: number }) {
  return (
    <div
      className={`grid gap-4 p-4`}
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {/* ستون اول: آیکون + متن */}
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-md" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>

      {/* ستون‌های وسط */}
      {Array.from({ length: cols - 2 }).map((_, i) => (
        <Skeleton key={i} className="h-4 w-20" />
      ))}

      {/* ستون آخر: اکشن‌ها */}
      <div className="flex justify-end gap-2">
        <Skeleton className="h-8 w-16" />
        <Skeleton className="h-8 w-16" />
      </div>
    </div>
  );
}

export function OrderTableSkeleton({
  rows = 8,
  cols = 5,
}: {
  rows?: number;
  cols?: number;
}) {
  return (
    <div className="rounded-lg border border-neutral-200 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-900 shadow-sm">
      {/* Table Header */}
      <TableHeaderSkeleton cols={cols} />

      {/* Table Rows */}
      <div className="divide-y divide-border">
        {Array.from({ length: rows }).map((_, i) => (
          <TableRowSkeleton key={i} cols={cols} />
        ))}
      </div>
    </div>
  );
}

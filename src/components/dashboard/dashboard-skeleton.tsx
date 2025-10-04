// components/dashboard/DashboardSkeleton.tsx
import { Skeleton } from '@/components/ui/skeleton';

function SectionHeaderSkeleton() {
  return (
    <div className="flex justify-between">
      <Skeleton className="h-5 w-24" />
      <Skeleton className="h-5 w-16" />
    </div>
  );
}

function CardGridSkeleton({ cols, count }: { cols: number; count: number }) {
  return (
    <div
      className={`grid gap-4`}
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} className="h-20 w-full rounded-md" />
      ))}
    </div>
  );
}

function ListSkeleton({ rows }: { rows: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-4 w-32" />
        </div>
      ))}
    </div>
  );
}

export default function DashboardSkeleton() {
  return (
    <div className="grid gap-8">
      {/* بخش سفارش‌ها */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">سفارش‌ها</h2>
        <div className="rounded-lg border bg-card p-4 space-y-4">
          <SectionHeaderSkeleton />
          <CardGridSkeleton cols={3} count={3} />
        </div>
      </section>

      {/* بخش محصولات */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">محصولات</h2>
        <div className="rounded-lg border bg-card p-4 space-y-4">
          <SectionHeaderSkeleton />
          <CardGridSkeleton cols={4} count={4} />
        </div>
      </section>

      {/* بخش دسته‌بندی‌ها */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">دسته‌بندی‌ها</h2>
        <div className="rounded-lg border bg-card p-4 space-y-4">
          <SectionHeaderSkeleton />
          <ListSkeleton rows={5} />
        </div>
      </section>
    </div>
  );
}

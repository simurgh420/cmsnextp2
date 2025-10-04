// app/products/loading.tsx
import DashboardSkeleton from '@/components/dashboard/dashboard-skeleton';

export default function DashboardLoading() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">داشبورد </h1>
        <div className="flex items-center gap-2">
          <div className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm"></div>
        </div>
      </div>

      {/* Table Skeleton */}
      <DashboardSkeleton />
    </div>
  );
}

// app/Reports/loading.tsx
import { Skeleton } from '@/components/ui';
import { ReportTableSkeleton } from '@/components/reports/report-table-skeleton';

export default function ReportsLoading() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-48" /> {/* عنوان گزارش‌ها */}
        <Skeleton className="h-9 w-32 rounded-md" /> {/* دکمه افزودن */}
      </div>

      {/* Table Skeleton */}
      <ReportTableSkeleton rows={8} />
    </div>
  );
}

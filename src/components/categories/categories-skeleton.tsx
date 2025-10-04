// components/categories/categories-skeleton.tsx
import { Skeleton } from '@/components/ui/skeleton';

export default function CategoriesSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <div className="mx-auto max-w-3xl space-y-8 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-40" /> {/* عنوان مدیریت دسته‌بندی‌ها */}
        <Skeleton className="h-9 w-32 rounded-md" />{' '}
        {/* دکمه + دسته‌بندی جدید */}
      </div>

      {/* Categories List */}
      <div className="overflow-hidden rounded-lg border bg-card shadow-sm divide-y divide-border">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center justify-between px-6 py-4">
            <Skeleton className="h-5 w-32" /> {/* نام دسته‌بندی */}
            <div className="flex items-center gap-4">
              <Skeleton className="h-5 w-12" /> {/* لینک ویرایش */}
              <Skeleton className="h-8 w-20 rounded-md" /> {/* دکمه حذف */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

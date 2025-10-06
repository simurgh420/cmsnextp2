import { Skeleton } from '@/components/ui';

export default function CategoriesSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <div className="mx-auto max-w-3xl space-y-8 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-40 bg-neutral-200 dark:bg-neutral-700" />
        {/* عنوان مدیریت دسته‌بندی‌ها */}
        <Skeleton className="h-9 w-32 rounded-md bg-neutral-200 dark:bg-neutral-700" />
        {/* دکمه + دسته‌بندی جدید */}
      </div>

      {/* Categories List */}
      <div className="overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-900 shadow-sm divide-y divide-neutral-200 dark:divide-neutral-700 transition-colors duration-300">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center justify-between px-6 py-4">
            <Skeleton className="h-5 w-32 bg-neutral-200 dark:bg-neutral-700" />
            {/* نام دسته‌بندی */}
            <div className="flex items-center gap-4">
              <Skeleton className="h-5 w-12 bg-neutral-200 dark:bg-neutral-700" />
              {/* لینک ویرایش */}
              <Skeleton className="h-8 w-20 rounded-md bg-neutral-200 dark:bg-neutral-700" />
              {/* دکمه حذف */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

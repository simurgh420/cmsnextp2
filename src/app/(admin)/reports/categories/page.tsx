// app/(admin)/reports/categories/page.tsx
import { getDashboardData } from '@/app/(admin)/dashboard/actions';
import CategoriesReport from '@/components/dashboard/CategoriesReport';

export default async function CategoriesReportPage() {
  const data = await getDashboardData();

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-foreground">گزارش دسته‌بندی‌ها</h1>
      <CategoriesReport data={data.categories} />
    </div>
  );
}

// app/(admin)/reports/products/page.tsx
import { getDashboardData } from '@/app/(admin)/dashboard/actions';
import ProductsReport from '@/components/dashboard/ProductsReport';

export default async function ProductsReportPage() {
  const data = await getDashboardData();

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-foreground">گزارش محصولات</h1>
      <ProductsReport data={data.products} />
    </div>
  );
}

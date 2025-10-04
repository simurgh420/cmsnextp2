// components/dashboard/Dashboard.tsx

import { DashboardData } from '@/lib/types';
import OrdersReport from './OrdersReport';
import ProductsReport from './ProductsReport';
import CategoriesReport from './CategoriesReport';

export default function Dashboard({ data }: { data: DashboardData }) {
  return (
    <div className="grid gap-8">
      {/* بخش سفارش‌ها */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">سفارش‌ها</h2>
        <OrdersReport data={data.orders} />
      </section>

      {/* بخش محصولات */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">محصولات</h2>
        <ProductsReport data={data.products} />
      </section>

      {/* بخش دسته‌بندی‌ها */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">دسته‌بندی‌ها</h2>
        <CategoriesReport data={data.categories} />
      </section>
    </div>
  );
}

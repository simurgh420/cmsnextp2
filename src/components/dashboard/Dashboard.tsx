import { DashboardData } from '@/lib/types';
import OrdersReport from './OrdersReport';
import ProductsReport from './ProductsReport';
import CategoriesReport from './CategoriesReport';

export default function Dashboard({ data }: { data: DashboardData }) {
  return (
    <div className="grid gap-8">
      {/* بخش سفارش‌ها */}
      <section className="rounded-lg border border-neutral-200 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-900 p-6 shadow-sm space-y-4 transition-colors duration-300">
        <h2 className="text-lg font-semibold text-foreground border-b border-neutral-200 dark:border-neutral-700 pb-2">
          سفارش‌ها
        </h2>
        <OrdersReport data={data.orders} />
      </section>

      {/* بخش محصولات */}
      <section className="rounded-lg border border-neutral-200 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-900 p-6 shadow-sm space-y-4 transition-colors duration-300">
        <h2 className="text-lg font-semibold text-foreground border-b border-neutral-200 dark:border-neutral-700 pb-2">
          محصولات
        </h2>
        <ProductsReport data={data.products} />
      </section>

      {/* بخش دسته‌بندی‌ها */}
      <section className="rounded-lg border border-neutral-200 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-900 p-6 shadow-sm space-y-4 transition-colors duration-300">
        <h2 className="text-lg font-semibold text-foreground border-b border-neutral-200 dark:border-neutral-700 pb-2">
          دسته‌بندی‌ها
        </h2>
        <CategoriesReport data={data.categories} />
      </section>
    </div>
  );
}

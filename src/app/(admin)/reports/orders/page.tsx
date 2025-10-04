// app/(admin)/reports/orders/page.tsx
import { getDashboardData } from '@/app/(admin)/dashboard/actions';
import OrdersReport from '@/components/dashboard/OrdersReport';

export default async function OrdersReportPage() {
  const data = await getDashboardData();

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-foreground">گزارش سفارش‌ها</h1>
      <OrdersReport data={data.orders} />
    </div>
  );
}

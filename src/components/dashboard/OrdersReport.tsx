// components/dashboard/OrdersReport.tsx
'use client';

import { OrdersKpis, OrdersByDate, OrdersByStatus } from '@/lib/types';
import KpiCards from '../reports/KpiCards';
import OrdersLineChart from '../reports/OrdersLineChart';
import OrdersStatusChart from '../reports/OrdersStatusChart';

export default function OrdersReport({
  data,
}: {
  data: {
    kpis: OrdersKpis;
    byDate: OrdersByDate[];
    byStatus: OrdersByStatus[];
  };
}) {
  return (
    <div className="space-y-6">
      <KpiCards kpis={data.kpis} />
      <div className="grid md:grid-cols-2 gap-6">
        <OrdersLineChart data={data.byDate} />
        <OrdersStatusChart data={data.byStatus} />
      </div>
    </div>
  );
}

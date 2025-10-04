// components/reports/ReportsDashboard.tsx
'use client';

import { ReportsData } from '@/lib/types';
import KpiCards from './KpiCards';
import OrdersLineChart from './OrdersLineChart';
import OrdersStatusChart from './OrdersStatusChart';

export default function ReportsDashboard({ data }: { data: ReportsData }) {
  return (
    <div className="grid gap-6">
      <KpiCards kpis={data.kpis} />
      <div className="grid md:grid-cols-2 gap-6">
        <OrdersLineChart data={data.ordersByDate} />
        <OrdersStatusChart data={data.ordersByStatus} />
      </div>
    </div>
  );
}

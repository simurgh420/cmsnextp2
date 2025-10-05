// components/reports/KpiCards.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { Kpis } from '@/lib/types';

export default function KpiCards({ kpis }: { kpis: Kpis }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>کل سفارش‌ها</CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-bold">
          {kpis.totalOrders}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>پرداخت شده</CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-bold text-green-600 dark:text-green-400">
          {kpis.totalPaid}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>در انتظار</CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
          {kpis.totalPending}
        </CardContent>
      </Card>
    </div>
  );
}

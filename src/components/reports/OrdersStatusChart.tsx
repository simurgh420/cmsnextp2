// components/reports/OrdersStatusChart.tsx
'use client';

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';
import { OrdersByStatus } from '@/lib/types';

const COLORS = ['#facc15', '#22c55e', '#3b82f6', '#ef4444'];

export default function OrdersStatusChart({
  data,
}: {
  data: OrdersByStatus[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>وضعیت سفارش‌ها</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="count"
              nameKey="status"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

// components/dashboard/ProductsReport.tsx
'use client';

import { ProductsKpis, ProductsByCategory, TopProduct } from '@/lib/types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function ProductsReport({
  data,
}: {
  data: {
    kpis: ProductsKpis;
    byCategory: ProductsByCategory[];
    top: TopProduct[];
  };
}) {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>کل محصولات</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            {data.kpis.totalProducts}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>فعال</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold text-green-600 dark:text-green-400">
            {data.kpis.activeProducts}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>غیرفعال</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold text-red-600 dark:text-red-400">
            {data.kpis.inactiveProducts}
          </CardContent>
        </Card>
      </div>

      {/* Top Products */}
      <Card>
        <CardHeader>
          <CardTitle>پرفروش‌ترین محصولات</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.top}>
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="sales" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

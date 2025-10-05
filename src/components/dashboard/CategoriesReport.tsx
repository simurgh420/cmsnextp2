// components/dashboard/CategoriesReport.tsx
'use client';

import { CategoriesKpis } from '@/lib/types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';

export default function CategoriesReport({
  data,
}: {
  data: { kpis: CategoriesKpis };
}) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>تعداد دسته‌بندی‌ها</CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-bold">
          {data.kpis.totalCategories}
        </CardContent>
      </Card>
    </div>
  );
}

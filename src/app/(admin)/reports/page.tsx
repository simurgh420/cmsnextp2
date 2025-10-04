// app/(admin)/reports/page.tsx
import { getReportsData } from './actions';
import ReportsDashboard from '@/components/reports/ReportsDashboard';

export default async function ReportsPage() {
  const data = await getReportsData();

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-foreground">گزارش‌ها</h1>
      <ReportsDashboard data={data} />
    </div>
  );
}

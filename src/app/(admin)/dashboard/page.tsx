import { Suspense } from 'react';
import { getDashboardData } from './actions';
import Dashboard from '@/components/dashboard/Dashboard';
import DashboardSkeleton from '@/components/dashboard/dashboard-skeleton';

export default async function DashboardPage() {
  const data = await getDashboardData();

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-foreground">داشبورد</h1>
      <Suspense fallback={<DashboardSkeleton />}>
        <Dashboard data={data} />
      </Suspense>
    </div>
  );
}

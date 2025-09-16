import type { ReactNode } from 'react';
import { Sidebar } from '@/components/layout/Sidebar/Sidebar';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* سایدبار */}
      <Sidebar />

      {/* محتوای اصلی */}
      <main className="flex-1 p-4 md:p-6">{children}</main>
    </div>
  );
}

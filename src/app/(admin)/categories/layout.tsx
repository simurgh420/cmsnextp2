import type { ReactNode } from 'react';
import AppSidebar from '@/components/AppSidebar'; // 👈 سایدبار جدید
import { Header } from '@/components/layout/Header/Header';

export default function CategoriesLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background transition-colors duration-300">
      {/* سایدبار جدید */}
      <AppSidebar>
        <div className="flex-1 flex flex-col">
          {/* هدر */}
          <Header />
          {/* محتوای اصلی */}
          <main className="flex-1 p-4 md:p-6">{children}</main>
        </div>
      </AppSidebar>
    </div>
  );
}

import type { ReactNode } from 'react';
import { Sidebar } from '@/components/layout/Sidebar/Sidebar';
import { Header } from '@/components/layout/Header/Header';

export default function CategoriesLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* سایدبار */}
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        {/* محتوای اصلی */}
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}

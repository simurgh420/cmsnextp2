import type { ReactNode } from 'react';

import { Header } from '@/components/layout/Header/Header';

import AppSidebar from '@/components/AppSidebar';

export default function SettingsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background transition-colors duration-300">
      {/* سایدبار */}
      <AppSidebar>
        <div className="flex-1 flex flex-col">
          <Header />
          {/* محتوای اصلی */}
          <main className="flex-1 p-4 md:p-6">{children}</main>
        </div>
      </AppSidebar>
    </div>
  );
}

import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  // بررسی مسیر فعلی برای صفحات action
  const pathname =
    typeof window !== 'undefined' ? window.location.pathname : '';
  const isActionRoute =
    pathname.includes('/new') ||
    pathname.includes('/edit') ||
    pathname.includes('/[id]');

  if (isActionRoute && !userId) {
    redirect('/sign-in');
  }

  return (
    <div className="bg-background antialiased min-h-screen transition-colors duration-300">
      {children}
    </div>
  );
}

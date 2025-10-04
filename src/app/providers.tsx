// app/providers.tsx
'use client';

import { ThemeProvider } from 'next-themes';
import { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class" // کلاس dark روی html ست میشه
      defaultTheme="system" // پیش‌فرض از تنظیمات سیستم می‌گیره
      enableSystem // پشتیبانی از تم سیستم
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}

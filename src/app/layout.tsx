import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from '@/components/ui';
import { Providers } from './providers';
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'پنل مدیریت CMS',
  description: 'سیستم مدیریت محتوا و فروشگاه آنلاین',
  manifest: '/manifest.json',
};
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        // یا light, neobrutalism, shadesOfPurple و ...
        variables: {
          colorPrimary: '#4f46e5', // رنگ اصلی (مثلاً رنگ برند سایتت)
          colorBackground: '#0f172a', // پس‌زمینه
          colorText: '#f8fafc', // رنگ متن
          borderRadius: '0.5rem', // گوشه‌های گرد
          fontFamily: 'Inter, sans-serif',
        },
        elements: {
          card: 'shadow-xl border border-gray-700 bg-gray-900', // استایل کارت
          headerTitle: 'text-2xl font-bold text-white',
          headerSubtitle: 'text-gray-400',
          formButtonPrimary: 'bg-indigo-600 hover:bg-indigo-700 text-white',
          formFieldInput: 'rounded-md border-gray-600 bg-gray-800 text-white',
        },
      }}
    >
      <html lang="fa" dir="rtl" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100 dark:bg-neutral-800 text-foreground transition-colors duration-300`}
        >
          <Providers>
            {children}

            <Toaster position="top-right" richColors />
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}

import type { NextConfig } from 'next';
import withPWA from 'next-pwa';
const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'i.ebayimg.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
};
// ترکیب تنظیمات PWA با کانفیگ اصلی
export default withPWA({
  dest: 'public', // فایل‌های service worker و manifest در public ساخته می‌شن
  register: true, // service worker به صورت خودکار رجیستر می‌شه
  skipWaiting: true, // نسخه جدید SW سریع فعال می‌شه
  disable: process.env.NODE_ENV === 'development', // در dev غیرفعال
})(nextConfig);

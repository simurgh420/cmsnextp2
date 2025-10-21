import type { NextConfig } from 'next';
import withPWA from 'next-pwa';
import defaultRuntimeCaching from 'next-pwa/cache';
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'i.ebayimg.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
};

export default withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  runtimeCaching: [
    ...defaultRuntimeCaching,
    {
      urlPattern: /.*/i, // همه‌ی درخواست‌ها
      handler: 'NetworkFirst',
      options: {
        cacheName: 'http-cache',
        expiration: {
          maxEntries: 200,
          maxAgeSeconds: 24 * 60 * 60, // یک روز
        },
        // اینجا صفحه‌ی آفلاین رو معرفی می‌کنیم
        fallback: '/offline',
      },
    },
  ],
})(nextConfig);

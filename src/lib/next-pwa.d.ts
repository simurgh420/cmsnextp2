declare module 'next-pwa' {
  import { NextConfig } from 'next';
  import { PWAOptions } from '@/lib/types';

  export default function withPWA(
    options?: PWAOptions,
  ): (nextConfig: NextConfig) => NextConfig;
}
declare module 'next-pwa/cache' {
  const runtimeCaching: any;
  export default runtimeCaching;
}

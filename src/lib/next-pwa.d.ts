declare module 'next-pwa' {
  import { NextConfig } from 'next';

  type PWAOptions = {
    dest?: string;
    disable?: boolean;
    register?: boolean;
    skipWaiting?: boolean;
    [key: string]: any;
  };

  export default function withPWA(
    options?: PWAOptions,
  ): (nextConfig: NextConfig) => NextConfig;
}
declare module 'next-pwa/cache' {
  const runtimeCaching: any;
  export default runtimeCaching;
}


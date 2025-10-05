'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error('Global error boundary caught:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center space-y-4">
      <h2 className="text-xl font-bold text-red-600">خطایی رخ داده است</h2>
      <p className="text-muted-foreground">
        {error.message || 'مشکلی در بارگذاری صفحه پیش آمد.'}
      </p>
      <div className="flex gap-2">
        <Button variant="default" onClick={() => reset()}>
          تلاش مجدد
        </Button>
        <Button variant="secondary" onClick={() => router.push('/')}>
          بازگشت به صفحه اصلی
        </Button>
      </div>
    </div>
  );
}

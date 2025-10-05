// components/Pagination.tsx
'use client';
import { Button } from '@/components/ui';
import { useRouter, useSearchParams } from 'next/navigation';

export function Pagination({
  page,
  totalPages,
}: {
  page: number;
  totalPages: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const goToPage = (p: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(p));
    router.push(`?${params.toString()}`);
  };
  return (
    <div className="flex gap-2 items-center">
      <Button onClick={() => goToPage(page - 1)} disabled={page === 1}>
        قبلی
      </Button>
      <span>
        {page} از {totalPages}
      </span>
      <Button onClick={() => goToPage(page + 1)} disabled={page === totalPages}>
        بعدی
      </Button>
    </div>
  );
}

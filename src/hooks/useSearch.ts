// hooks/useSearch.ts
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export function useSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');

  const onSearch = (q: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (q) {
      params.set('q', q);
    } else {
      params.delete('q');
    }
    router.push(`?${params.toString()}`);
  };

  return { query, setQuery, onSearch };
}

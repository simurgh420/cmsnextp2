// hooks/usePagination.ts
import { useState } from 'react';

export function usePagination(totalItems: number, pageSize: number = 10) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(totalItems / pageSize);

  const next = () => setPage((p) => Math.min(p + 1, totalPages));
  const prev = () => setPage((p) => Math.max(p - 1, 1));
  const goTo = (p: number) => setPage(Math.min(Math.max(p, 1), totalPages));

  return { page, totalPages, next, prev, goTo, pageSize };
}

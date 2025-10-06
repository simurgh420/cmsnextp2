'use client';

import Loader from '@/components/styled-components/Loader';

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <Loader />
    </div>
  );
}

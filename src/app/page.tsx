'use client';

import Link from 'next/link';
import Card from '@/components/styled-components/Card';
import MainButton from '@/components/styled-components/Button';
export default function Home() {
  return (
    <div className="relative min-h-screen bg-neutral-950 text-white">
      <main className="relative z-10 flex flex-col items-center justify-center h-screen text-center px-6">
        <MainButton>
          <Link href="/dashboard" className="text-white no-underline">
            ورود به داشبورد
          </Link>
        </MainButton>
        <Card />
      </main>
    </div>
  );
}

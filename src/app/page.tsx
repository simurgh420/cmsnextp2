'use client';

import Link from 'next/link';
import Card from '@/components/styled-components/Card';
import { useEffect, useState } from 'react';
import Loader from '@/components/styled-components/Loader';
import MainButton from '@/components/styled-components/Button';
export default function Home() {
  const [showLoader, setShowLoader] = useState(true);
  useEffect(() => {
    const hasSeenLoader = localStorage.getItem('seenLoader');

    if (hasSeenLoader) {
      setShowLoader(false);
    } else {
      const timer = setTimeout(() => {
        setShowLoader(false);
        localStorage.setItem('seenLoader', 'true');
      }, 2500); // مثلا ۲.۵ ثانیه
      return () => clearTimeout(timer);
    }
  }, []);
  if (showLoader) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <Loader />
      </div>
    );
  }
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

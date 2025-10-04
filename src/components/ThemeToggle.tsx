// components/ThemeToggle.tsx
'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // برای جلوگیری از خطای Hydration
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded hover:bg-accent transition-colors duration-300"
    >
      {theme === 'dark' ? (
        <MdLightMode className="text-yellow-400" size={20} />
      ) : (
        <MdDarkMode className="text-foreground" size={20} />
      )}
    </button>
  );
}

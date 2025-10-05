// components/settings/SystemSettings.tsx
'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';
import { Switch } from '@/components/ui';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

export default function SystemSettings() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  // جلوگیری از Hydration mismatch
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <Card>
      <CardHeader>
        <CardTitle>تنظیمات سیستم</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-foreground">حالت تاریک</span>
          <Switch
            checked={theme === 'dark'}
            onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-foreground">نوتیفیکیشن‌ها</span>
          <Switch />
        </div>
      </CardContent>
    </Card>
  );
}

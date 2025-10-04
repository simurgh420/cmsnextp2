// components/settings/UserSettings.tsx
'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function UserSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>تنظیمات کاربری</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block mb-1 text-foreground">ایمیل</label>
          <Input type="email" placeholder="ایمیل ادمین" />
        </div>
        <div>
          <label className="block mb-1 text-foreground">رمز عبور جدید</label>
          <Input type="password" placeholder="********" />
        </div>
        <Button>ذخیره</Button>
      </CardContent>
    </Card>
  );
}

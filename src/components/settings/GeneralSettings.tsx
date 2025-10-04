// components/settings/GeneralSettings.tsx
'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function GeneralSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>تنظیمات عمومی</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block mb-1 text-foreground">نام سایت</label>
          <Input placeholder="نام سایت را وارد کنید" />
        </div>
        <div>
          <label className="block mb-1 text-foreground">لوگو</label>
          <Input type="file" />
        </div>
        <Button>ذخیره</Button>
      </CardContent>
    </Card>
  );
}

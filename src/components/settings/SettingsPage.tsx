// components/settings/SettingsPage.tsx
'use client';

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import GeneralSettings from './GeneralSettings';
import UserSettings from './UserSettings';
import SystemSettings from './SystemSettings';

export default function SettingsPage() {
  return (
    <Tabs defaultValue="general" className="w-full" dir="rtl">
      {/* لیست تب‌ها */}
      <TabsList className="flex justify-start gap-2 border-b border-border mb-6">
        <TabsTrigger
          value="general"
          className="px-4 py-2 text-sm font-medium rounded-t-md data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
        >
          عمومی
        </TabsTrigger>
        <TabsTrigger
          value="user"
          className="px-4 py-2 text-sm font-medium rounded-t-md data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
        >
          کاربری
        </TabsTrigger>
        <TabsTrigger
          value="system"
          className="px-4 py-2 text-sm font-medium rounded-t-md data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
        >
          سیستم
        </TabsTrigger>
      </TabsList>

      {/* محتوای تب‌ها */}
      <div className="mt-4 space-y-6">
        <TabsContent value="general" className="focus:outline-none">
          <GeneralSettings />
        </TabsContent>
        <TabsContent value="user" className="focus:outline-none">
          <UserSettings />
        </TabsContent>
        <TabsContent value="system" className="focus:outline-none">
          <SystemSettings />
        </TabsContent>
      </div>
    </Tabs>
  );
}

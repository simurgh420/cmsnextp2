// app/(admin)/settings/page.tsx
import SettingsPage from '@/components/settings/SettingsPage';

export default function Settings() {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-center text-foreground">تنظیمات</h1>
      <SettingsPage />
    </div>
  );
}
export const revalidate = 86400; // SSG: هر 24 ساعت

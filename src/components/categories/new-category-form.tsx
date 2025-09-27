'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function NewCategoryForm() {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, slug }),
      });
      if (res.ok) {
        router.push('/categories');
        router.refresh();
      } else {
        const errorData = await res.json().catch(() => {});
        alert(errorData.error || 'خطا در ایجاد دسته‌بندی');
      }
    } catch (error) {
      alert('ارتباط با سرور برقرار نشد');
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <div>
        <label className="block text-sm font-medium mb-1">نام دسته‌بندی</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="مثلاً: پوشاک"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">اسلاگ</label>
        <input
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="مثلاً: clothing"
          required
        />
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? 'در حال ثبت...' : 'ثبت دسته‌بندی'}
      </Button>
    </form>
  );
}

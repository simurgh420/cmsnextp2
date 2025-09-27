'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type Category = {
  id: string;
  name: string;
  slug: string;
};

export default function EditCategoryForm({ category }: { category: Category }) {
  const [name, setName] = useState(category.name);
  const [slug, setSlug] = useState(category.slug);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`/api/categories/${category.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, slug }),
      });
      if (res.ok) {
        router.push('/categories');
        router.refresh();
      } else {
        const errorData = await res.json().catch(() => {});
        alert(errorData.error || 'خطا در ویرایش دسته‌بندی');
      }
    } catch (error) {
      alert('ارتباط با سرور برقرار نشد');
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-1">نام دسته‌بندی</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">اسلاگ</label>
        <input
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          required
        />
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? 'در حال ذخیره...' : 'ذخیره تغییرات'}
      </Button>
    </form>
  );
}

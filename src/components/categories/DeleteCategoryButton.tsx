'use client';

import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';

export default function DeleteCategoryButton({ id }: { id: string }) {
  const router = useRouter();
  const handleDelete = async () => {
    if (!confirm('آیا مطمئن هستید که می‌خواهید این دسته‌بندی را حذف کنید؟'))
      return;

    try {
      const res = await fetch(`/api/categories/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        router.refresh(); // لیست دوباره رندر میشه
      } else {
        const data = await res.json();
        alert(data.error || 'خطا در حذف دسته‌بندی');
      }
    } catch (error) {
      console.error('خطای شبکه یا سرور', error);
      alert('خطای شبکه یا سرور');
    }
  };
  return (
    <Button
      onClick={handleDelete}
      className="text-sm font-medium text-red-600 hover:text-red-800"
    >
      حذف
    </Button>
  );
}

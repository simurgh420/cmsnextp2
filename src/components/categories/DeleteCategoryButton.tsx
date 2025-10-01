'use client';
import { Button } from '../ui/button';
import { useTransition } from 'react';
import { toast } from 'sonner';
import { deleteCategory } from '@/app/(admin)/categories/actions';

export default function DeleteCategoryButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();
  const handleDelete = async () => {
    if (!confirm('آیا مطمئن هستید که می‌خواهید این دسته‌بندی را حذف کنید؟'))
      return;
    startTransition(async () => {
      try {
        await deleteCategory(id);
        toast.success('دسته‌بندی با موفقیت حذف شد');
      } catch (error) {
        console.error('خطای شبکه یا سرور', error);
        toast.error('خطای شبکه یا سرور');
      }
    });
  };
  return (
    <Button
      onClick={handleDelete}
      className="text-sm font-medium text-red-600 hover:text-red-800"
      disabled={isPending}
    >
      حذف
    </Button>
  );
}

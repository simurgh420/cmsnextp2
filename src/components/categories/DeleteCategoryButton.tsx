'use client';
import { Button } from '../ui/button';
import { useTransition } from 'react';
import { deleteCategory } from '@/app/(admin)/categories/actions';
import { useNotify } from '@/lib/notify';

export default function DeleteCategoryButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();
  const notify = useNotify();
  const handleDelete = async () => {
    if (!confirm('آیا مطمئن هستید که می‌خواهید این دسته‌بندی را حذف کنید؟'))
      return;
    startTransition(async () => {
      try {
        await deleteCategory(id);
        notify({
          title: 'موفقیت',
          message: '✅دسته‌بندی با موفقیت حذف شد',
          type: 'success',
          duration: 5000,
        });
      } catch (error) {
        console.error('❌خطای شبکه یا سرور', error);
        notify({
          title: 'خطا',
          message: 'ارتباط با سرور برقرار نشد',
          type: 'error',
          duration: Infinity,
        });
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

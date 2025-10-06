'use client';
import { Button } from '../ui/button';
import { useTransition } from 'react';
import { deleteCategory } from '@/app/(admin)/categories/actions';
import { useNotify } from '@/lib/notify';
import { useAuth } from '@clerk/nextjs';

export default function DeleteCategoryButton({ id }: { id: string }) {
  const { userId } = useAuth(); // اضافه شد
  const [isPending, startTransition] = useTransition();
  const notify = useNotify();
  const handleDelete = async () => {
    if (!userId) {
      notify({
        title: 'عدم دسترسی',
        message: 'برای حذف دسته‌بندی ابتدا وارد شوید',
        type: 'error',
        duration: 5000,
      });
      return;
    }

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
      variant="ghost"
      className="text-sm font-medium text-red-600 hover:text-red-800"
      disabled={isPending}
    >
      حذف
    </Button>
  );
}

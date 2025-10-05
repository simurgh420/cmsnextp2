'use client';
import { useTransition } from 'react';
import { Button } from '@/components/ui';
import { Trash } from 'lucide-react';
import { deleteOrder } from '@/app/(admin)/orders/actions';
import { useRouter } from 'next/navigation';
import { useNotify } from '@/lib/notify';
import { useAuth } from '@clerk/nextjs';

export function DeleteOrderButton({ id }: { id: string }) {
  const { userId } = useAuth(); // اضافه شد
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const notify = useNotify();
  const handleDelete = () => {
    if (!userId) {
      notify({
        title: 'عدم دسترسی',
        message: 'برای حذف سفارش ابتدا وارد شوید',
        type: 'error',
        duration: 5000,
      });
      return;
    }
    const confirmed = confirm(
      'آیا مطمئن هستید که می‌خواهید این سفارش را حذف کنید؟',
    );
    if (!confirmed) return;

    startTransition(async () => {
      try {
        await deleteOrder(id);
        router.refresh(); // برای رفرش شدن لیست بعد از حذف
        notify({
          title: 'موفقیت',
          message: '✅سفارش با موفقیت حذف شد',
          type: 'success',
          duration: 5000,
        });
      } catch (error) {
        console.error(error);
        notify({
          title: 'خطا',
          message: '❌ارتباط با سرور برقرار نشد',
          type: 'error',
          duration: Infinity,
        });
      }
    });
  };
  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={handleDelete}
      disabled={isPending}
    >
      <Trash className="h-4 w-4 mr-2" />
      {isPending ? 'در حال حذف...' : 'حذف'}
    </Button>
  );
}
export default DeleteOrderButton;

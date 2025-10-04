'use client';

import { useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { deleteOrder } from '@/app/(admin)/orders/actions'; // همون اکشنی که قبلاً نوشتی
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

type DeleteOrderButtonProps = {
  id: string;
};

export  function DeleteOrderButton({ id }: DeleteOrderButtonProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const handleDelete = () => {
    const confirmed = confirm(
      'آیا مطمئن هستید که می‌خواهید این سفارش را حذف کنید؟',
    );
    if (!confirmed) return;

    startTransition(async () => {
      try {
        await deleteOrder(id);
        router.refresh(); // برای رفرش شدن لیست بعد از حذف
        toast.success('سفارش با موفقیت حذف شد.');
      } catch (error) {
        console.error(error);
        toast.error('خطایی رخ داده است. سفارش حذف نشد.');
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


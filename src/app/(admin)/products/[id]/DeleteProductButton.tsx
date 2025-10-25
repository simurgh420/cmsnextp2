'use client';

import { useState, useTransition } from 'react';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { deleteProduct } from '../actions';
import { useAuth } from '@clerk/nextjs';
import { useNotify } from '@/lib/notify';

export default function DeleteProductButton({
  id,
  name,
}: {
  id: string;
  name: string;
}) {
  const { userId } = useAuth();
  const notify = useNotify();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const handleDelete = () => {
    startTransition(async () => {
      try {
        await deleteProduct(id);
        notify({
          title: 'موفقیت',
          message: 'محصول با موفقیت حذف شد ',
          type: 'success',
          duration: 5000,
        });
        setOpen(false);
      } catch (error) {
        console.error('Delete failed:', error);
        notify({
          title: 'خطا',
          message: '❌خطا در حذف محصول',
          type: 'error',
          duration: Infinity,
        });
      }
    });
  };
  return userId ? (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="sm" className="text-xs px-2 py-1">
          <Trash2 className="h-4 w-4 mr-2" />
          حذف
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>آیا مطمئن هستید؟</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">
          این عملیات غیرقابل بازگشت است. محصول «{name}» حذف خواهد شد.
        </p>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            انصراف
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? 'در حال حذف...' : 'حذف محصول'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ) : (
    <Button
      variant="destructive"
      size="sm"
      disabled
      className="text-xs px-2 py-1 opacity-50 cursor-not-allowed"
    >
      برای حذف وارد شوید
    </Button>
  );
}

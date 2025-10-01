'use client';

import { use, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from 'sonner';

export default function DeleteProductButton({
  id,
  name,
}: {
  id: string;
  name: string;
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => {});
        throw new Error(errorData.error || res.statusText);
      }
      setOpen(false);
      router.push('/products');
      router.refresh();
    } catch (error) {
      console.error('Delete failed:', error);
      toast.error('حذف محصول با خطا مواجه شد');
    }
  };
  return (
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
        <p className="text-sm text-gray-600">
          این عملیات غیرقابل بازگشت است. محصول «{name}» حذف خواهد شد.
        </p>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            انصراف
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            حذف محصول
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

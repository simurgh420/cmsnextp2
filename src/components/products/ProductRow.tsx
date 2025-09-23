'use client';

import { FC, useState } from 'react';
import { Product } from '@prisma/client';
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import Image from 'next/image';
import { Status } from '@prisma/client';
import { useRouter } from 'next/navigation';
type Props = {
  product: Product;
};

export const ProductRow: FC<Props> = ({ product }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const handleDelete = async () => {
    const res = await fetch(`/api/products/${product.id}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      router.refresh();
    } else {
      alert('خطا در حذف محصول');
    }
    setOpen(false);
  };
  return (
    <TableRow>
      <TableCell className="text-right">
        <Image
          src={product.image || '/noImage.jpg'}
          alt={product.name}
          width={50}
          height={50}
          className="w-12 h-12 object-cover rounded"
        />
      </TableCell>
      <TableCell className="text-right">{product.name}</TableCell>
      <TableCell className="text-right">
        {product.price.toLocaleString()} تومان
      </TableCell>
      <TableCell className="text-right">
        {product.status === Status.ACTIVE ? (
          <span className="text-green-600">فعال</span>
        ) : (
          <span className="text-red-600">غیرفعال</span>
        )}
      </TableCell>
      <TableCell className="text-right flex gap-2">
        {/* دکمه ویرایش → لینک به صفحه ویرایش */}
        <Link
          href={`/products/${product.id}`}
          className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          ویرایش
        </Link>
        {/* دکمه حذف با Dialog */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              variant="destructive"
              size="sm"
              className="text-xs px-2 py-1"
            >
              حذف
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>آیا مطمئن هستید؟</DialogTitle>
            </DialogHeader>
            <p className="text-sm text-gray-600">
              این عملیات غیرقابل بازگشت است. محصول «{product.name}» حذف خواهد
              شد.
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
      </TableCell>
    </TableRow>
  );
};

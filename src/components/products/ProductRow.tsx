'use client';

import { FC, useState } from 'react';
import { Product } from '@/application/products/products.types';
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
type Props = {
  product: Product;
};

export const ProductRow: FC<Props> = ({ product }) => {
  const [open, setOpen] = useState(false);
  const handleDelete = () => {
    console.log('حذف محصول', product.id);
    setOpen(false);
  };
  return (
    <tr className="border-b text-sm">
      <td className="p-3">{product.name}</td>
      <td className="p-3">{product.price.toLocaleString()} تومان</td>
      <td className="p-3">
        {product.status === 'active' ? (
          <span className="text-green-600">فعال</span>
        ) : (
          <span className="text-red-600">غیرفعال</span>
        )}
      </td>
      <td className="p-3 flex gap-2">
        {/* دکمه ویرایش → لینک به صفحه ویرایش */}
        <Link
          href={`/products/edit/${product.id}`}
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
      </td>
    </tr>
  );
};

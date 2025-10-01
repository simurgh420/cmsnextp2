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
import { Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { deleteProduct } from '@/app/(admin)/products/actions';
type Props = {
  product: Product;
};

export const ProductRow: FC<Props> = ({ product }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const handleDelete = async () => {
    try {
      await deleteProduct(product.id);
      toast.success('محصول با موفقیت حذف شد');
      router.refresh();
    } catch (error) {
      toast.error('خطا در حذف محصول');
    } finally {
      setOpen(false);
    }
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
        {/* دکمه جزئیات → لینک به صفحه جزئیات */}
        <Link
          href={`/products/${product.id}`}
          className="inline-flex items-center"
        >
          <Button variant="secondary" size="sm" className="text-xs h-8 px-3">
            {' '}
            جزئیات
          </Button>
        </Link>
        {/* دکمه ویرایش */}
        <Link
          href={`/products/edit/${product.id}`}
          className="inline-flex items-center"
        >
          <Button variant="outline" size="sm" className="text-xs h-8 px-3">
            <Edit className="h-4 w-4 mr-2" />
            ویرایش
          </Button>
        </Link>
        {/* دکمه حذف با Dialog */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              variant="destructive"
              size="sm"
              className="text-xs px-2 py-1"
            >
              <Trash2 className="h-4 w-4 mr-2" />
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

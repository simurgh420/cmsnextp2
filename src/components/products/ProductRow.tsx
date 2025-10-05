'use client';

import { useState } from 'react';
import { Product } from '@prisma/client';
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui';
import { Button } from '@/components/ui';
import { TableCell, TableRow } from '@/components/ui/table';
import Image from 'next/image';
import { Status } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { Edit, Eye, Trash2 } from 'lucide-react';
import { deleteProduct } from '@/app/(admin)/products/actions';
import { useNotify } from '@/lib/notify';
import { useAuth } from '@clerk/nextjs';

export const ProductRow = ({ product }: { product: Product }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const notify = useNotify();
  const { userId } = useAuth();

  const handleDelete = async () => {
    try {
      await deleteProduct(product.id);
      notify({
        title: 'موفقیت',
        message: `✅محصول «${product.name}» با موفقیت حذف شد`,
        type: 'success',
        duration: 5000,
      });
      router.refresh();
    } catch (error) {
      notify({
        title: 'خطا',
        message: '❌خطا در حذف محصول',
        type: 'error',
        duration: Infinity,
      });
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
          <span className="text-green-600 dark:text-green-400">فعال</span>
        ) : (
          <span className="text-red-600 dark:text-red-400">غیرفعال</span>
        )}
      </TableCell>
      <TableCell className="text-right flex gap-2">
        {/* دکمه جزئیات → لینک به صفحه جزئیات */}
        <Link
          href={`/products/${product.id}`}
          className="inline-flex items-center"
        >
          <Button variant="secondary" size="sm" className="text-xs h-8 px-3">
            <Eye className="h-4 w-4 mr-2" />
            جزئیات
          </Button>
        </Link>
        {/* دکمه ویرایش */}
        {userId ? (
          <Link
            href={`/admin/products/edit/${product.id}`}
            className="inline-flex items-center"
          >
            <Button variant="outline" size="sm" className="text-xs h-8 px-3">
              <Edit className="h-4 w-4 mr-2" />
              ویرایش
            </Button>
          </Link>
        ) : (
          <Button
            variant="outline"
            size="sm"
            disabled
            className="text-xs h-8 px-3"
          >
            برای ویرایش وارد شوید
          </Button>
        )}
        {/* دکمه حذف با Dialog */}
        {userId ? (
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
              <p className="text-sm text-muted-foreground">
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
        ) : (
          <Button
            variant="destructive"
            size="sm"
            disabled
            className="text-xs px-2 py-1 opacity-50 cursor-not-allowed"
          >
            برای حذف وارد شوید
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
};

'use client';

import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import Link from 'next/link';
import { Product } from '@/application/products/products.types';
const schema = z.object({
  name: z.string().min(2, 'نام محصول الزامی است'),
  price: z.number().min(1000, 'قیمت باید بیشتر از 1000 باشد'),
  status: z.enum(['active', 'inactive']),
});

type FormData = z.infer<typeof schema>;
type Props = {
  initialData?: Product; // برای ویرایش
  onSubmit: (data: Omit<Product, 'id'>) => void;
};

export const ProductForm: FC<Props> = ({ initialData, onSubmit }) => {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: initialData ?? { name: '', price: 0, status: 'active' },
  });

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-4 bg-white p-6 rounded shadow"
    >
      {/* نام محصول */}
      <div>
        <label className="block text-sm font-medium mb-1">نام محصول</label>
        <Input {...form.register('name')} placeholder="مثلاً گوشی موبایل" />
        {form.formState.errors.name && (
          <p className="text-red-500 text-xs mt-1">
            {form.formState.errors.name.message}
          </p>
        )}
      </div>

      {/* قیمت */}
      <div>
        <label className="block text-sm font-medium mb-1">قیمت (تومان)</label>
        <Input
          type="number"
          {...form.register('price', { valueAsNumber: true })}
          placeholder="مثلاً 12000000"
        />
        {form.formState.errors.price && (
          <p className="text-red-500 text-xs mt-1">
            {form.formState.errors.price.message}
          </p>
        )}
      </div>

      {/* وضعیت */}
      <div>
        <label className="block text-sm font-medium mb-1">وضعیت</label>
        <Select
          onValueChange={(val) =>
            form.setValue('status', val as 'active' | 'inactive')
          }
          defaultValue="active"
        >
          <SelectTrigger>
            <SelectValue placeholder="انتخاب وضعیت" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">فعال</SelectItem>
            <SelectItem value="inactive">غیرفعال</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-4">
        <Button type="submit" className="flex-1">
          ذخیره محصول
        </Button>
        <Link href="/products">
          <Button type="button" variant="outline" className="flex-1">
            انصراف
          </Button>
        </Link>
      </div>
    </form>
  );
};

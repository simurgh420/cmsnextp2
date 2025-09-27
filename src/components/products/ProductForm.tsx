'use client';

import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Link from 'next/link';
import { Product } from '@prisma/client';
import { Status } from '@prisma/client';
import Image from 'next/image';
export type ProductFormData = {
  name: string;
  price: number;
  status: Status;
  image?: string | null;
  categoryId: string;
};
const schema = z.object({
  name: z.string().min(2, 'نام محصول الزامی است'),
  price: z.number().min(1000, 'قیمت باید بیشتر از 1000 باشد'),
  status: z.nativeEnum(Status),
  image: z.string().url('لینک عکس معتبر نیست').optional(),
  categoryId: z.string().min(1, 'انتخاب دسته‌بندی الزامی است'),
});
type Category = { id: string; name: string };
type FormData = z.infer<typeof schema>;
type Props = {
  initialData?: Partial<Product>; // برای ویرایش
  onSubmit: (data: ProductFormData) => void | Promise<void>;
};

export const ProductForm: FC<Props> = ({ initialData, onSubmit }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    fetch('/api/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: initialData?.name ?? '',
      price: initialData?.price ?? 0,
      status: initialData?.status ?? 'ACTIVE',
      image: initialData?.image ?? undefined,
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 bg-white p-6 rounded-lg shadow-md"
      >
        {/* نام محصول */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نام محصول</FormLabel>
              <FormControl>
                <Input placeholder="مثلاً گوشی موبایل" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* قیمت */}
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>قیمت (تومان)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="مثلاً 12000000"
                  {...field}
                  value={field.value ?? ''}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* وضعیت */}
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>وضعیت</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="انتخاب وضعیت" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={Status.ACTIVE}>فعال</SelectItem>
                    <SelectItem value={Status.INACTIVE}>غیرفعال</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* دسته بندی */}
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>دسته‌بندی</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="انتخاب دسته‌بندی" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cate) => (
                      <SelectItem key={cate.id} value={cate.id}>
                        {cate.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />

        {/* عکس محصول */}
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>لینک عکس محصول (اختیاری)</FormLabel>
              <FormControl>
                <div>
                  <Input
                    placeholder="https://example.com/image.jpg"
                    {...field}
                  />
                  {field.value && field.value.startsWith('http') && (
                    <Image
                      width={300}
                      height={300}
                      src={field.value}
                      alt="پیش‌نمایش محصول"
                      className="w-32 h-32 object-cover rounded border"
                    />
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4 pt-4">
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
    </Form>
  );
};

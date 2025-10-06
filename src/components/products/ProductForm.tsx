'use client';

import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui';
import { Input } from '@/components/ui';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui';
import Link from 'next/link';
import { Status } from '@prisma/client';
import Image from 'next/image';
import { productSchema, ProductSchema } from '@/lib/validations/product';

import { ProductFormProps } from '@/lib/types';

export const ProductForm: FC<ProductFormProps> = ({
  initialData,
  onSubmit,
  categories,
}) => {
  const form = useForm<ProductSchema>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: initialData?.name ?? '',
      price: initialData?.price ?? 0,
      status: initialData?.status ?? 'ACTIVE',
      image: initialData?.image ?? null,
      categoryId: initialData?.categoryId ?? '',
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-lg mx-auto bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-2xl shadow-lg p-0 overflow-hidden mt-8"
      >
        {/* هدر فرم */}
        <div className="flex flex-col items-center gap-2 py-8 border-b border-neutral-100 dark:border-neutral-800 bg-gradient-to-b from-gray-50/80 dark:from-neutral-900/80 to-transparent">
          <div className="w-24 h-24 flex items-center justify-center rounded-full border-4 border-indigo-100 dark:border-indigo-900 bg-white dark:bg-neutral-900 shadow-md mb-2">
            {initialData?.image ? (
              <Image
                src={initialData.image}
                alt={initialData.name || 'محصول'}
                width={90}
                height={90}
                className="rounded-full object-cover"
              />
            ) : (
              <span className="text-4xl text-muted-foreground">📦</span>
            )}
          </div>
          <h2 className="text-xl font-bold text-foreground">
            {initialData ? 'ویرایش محصول' : 'افزودن محصول جدید'}
          </h2>
          <p className="text-muted-foreground text-sm">
            {initialData
              ? 'ویرایش اطلاعات محصول'
              : 'لطفاً اطلاعات محصول را وارد کنید'}
          </p>
        </div>
        {/* فیلدهای فرم */}
        <div className="p-8 space-y-6">
          {/* نام محصول */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>نام محصول</FormLabel>
                <FormControl>
                  <Input
                    placeholder="مثلاً گوشی موبایل"
                    {...field}
                    className="bg-gray-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900 transition"
                  />
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
                    className="bg-gray-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900 transition"
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
                    <SelectTrigger className="bg-gray-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900 transition">
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
                    <SelectTrigger className="bg-gray-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900 transition">
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
                      value={field.value ?? ''}
                      className="bg-gray-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900 transition"
                    />
                    {field.value && field.value.startsWith('http') && (
                      <Image
                        width={90}
                        height={90}
                        src={field.value || ''}
                        alt="پیش‌نمایش محصول"
                        className="w-20 h-20 object-cover rounded-full border mt-2"
                      />
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-4 pt-6">
            <Button
              type="submit"
              className="flex-1 h-12 text-lg"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? 'در حال ذخیره...' : 'ذخیره محصول'}
            </Button>
            <Link href="/products">
              <Button
                type="button"
                variant="outline"
                className="flex-1 h-12 text-lg"
              >
                انصراف
              </Button>
            </Link>
          </div>
        </div>
      </form>
    </Form>
  );
};

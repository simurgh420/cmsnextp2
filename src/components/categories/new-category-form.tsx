'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { categorySchema, CategorySchema } from '@/lib/validations/category';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { toast } from 'sonner';

export default function NewCategoryForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CategorySchema>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: '',
      slug: '',
    },
  });
  const onSubmit = async (data: CategorySchema) => {
    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        router.push('/categories');
        router.refresh();
      } else {
        const errordata = await res.json().catch(() => {
          toast.error(errordata.error || 'خطا در ایجاد دسته‌بندی');
        });
      }
    } catch (error) {
      toast.error('ارتباط با سرور برقرار نشد');
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-md">
      <div>
        <label className="block text-sm font-medium mb-1">نام دسته‌بندی</label>
        <Input {...register('name')} placeholder="مثلا موبایل" />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">اسلاگ </label>
        <Input {...register('slug')} placeholder=" مثلا :Mobile" />
        {errors.slug && (
          <p className="text-red-500 text-sm mt-1">{errors.slug.message}</p>
        )}
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'در حال ثبت...' : 'ثبت دسته‌بندی'}
      </Button>
    </form>
  );
}

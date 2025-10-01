'use client';

import { Button } from '@/components/ui/button';
import { categorySchema, CategorySchema } from '@/lib/validations/category';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { toast } from 'sonner';
import { createCategory } from '@/app/(admin)/categories/actions';

export default function NewCategoryForm() {
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
      await createCategory(data);
      toast.success('دسته‌بندی با موفقیت ثبت شد');
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

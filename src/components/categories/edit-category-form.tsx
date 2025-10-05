'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui';
import { categorySchema, CategorySchema } from '@/lib/validations/category';
import { Input } from '../ui/input';
import { updateCategory } from '@/app/(admin)/categories/actions';
import { Category } from '@/lib/types';
import { useNotify } from '@/lib/notify';

export default function EditCategoryForm({ category }: { category: Category }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CategorySchema>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: category.name,
      slug: category.slug,
    },
  });
  const notify = useNotify();
  const onSubmit = async (data: CategorySchema) => {
    try {
      await updateCategory(category.id, data);
      notify({
        title: 'موفقیت',
        message: 'دسته‌بندی با موفقیت ویرایش شد✅',
        type: 'success',
        duration: 5000,
      });
    } catch (error) {
      notify({
        title: 'خطا',
        message: '❌ارتباط با سرور برقرار نشد',
        type: 'error',
        duration: Infinity, // toast تا وقتی کاربر نبنده می‌مونه
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-1 text-foreground">
          نام دسته‌بندی
        </label>
        <Input {...register('name')} />
        {errors.name && (
          <p className="text-destructive text-sm mt-1">{errors.name.message}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium mb-1 text-foreground">
          اسلاگ
        </label>
        <Input {...register('slug')} />
        {errors.slug && (
          <p className="text-destructive text-sm mt-1">{errors.slug.message}</p>
        )}
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'در حال ذخیره...' : 'ذخیره تغییرات'}
      </Button>
    </form>
  );
}

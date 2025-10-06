'use client';

import { Button } from '@/components/ui';
import { categorySchema, CategorySchema } from '@/lib/validations/category';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { createCategory } from '@/app/(admin)/categories/actions';
import { useNotify } from '@/lib/notify';

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

  const notify = useNotify();

  const onSubmit = async (data: CategorySchema) => {
    try {
      await createCategory(data);
      notify({
        title: 'موفقیت',
        message: '✅ دسته‌بندی با موفقیت ثبت شد',
        type: 'success',
        duration: 5000,
      });
    } catch (error) {
      notify({
        title: 'خطا',
        message: 'ارتباط با سرور برقرار نشد ❌',
        type: 'error',
        duration: Infinity,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-md rounded-lg border border-neutral-200 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-900 p-6 shadow-sm transition-colors duration-300"
    >
      <div>
        <label className="block text-sm font-medium mb-1 text-foreground">
          نام دسته‌بندی
        </label>
        <Input
          {...register('name')}
          placeholder="مثلا موبایل"
          className="bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 text-foreground"
        />
        {errors.name && (
          <p className="text-destructive text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-foreground">
          اسلاگ
        </label>
        <Input
          {...register('slug')}
          placeholder="مثلا: mobile"
          className="bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 text-foreground"
        />
        {errors.slug && (
          <p className="text-destructive text-sm mt-1">{errors.slug.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
      >
        {isSubmitting ? 'در حال ثبت...' : 'ثبت دسته‌بندی'}
      </Button>
    </form>
  );
}

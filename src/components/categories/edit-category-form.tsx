'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { categorySchema, CategorySchema } from '@/lib/validations/category';
import { Input } from '../ui/input';
type Category = {
  id: string;
  name: string;
  slug: string;
};

export default function EditCategoryForm({ category }: { category: Category }) {
  const router = useRouter();
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
  const onSubmit = async (data: CategorySchema) => {
    try {
      const res = await fetch(`/api/categories/${category.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        router.push('/categories');
        router.refresh();
      } else {
        const errorData = await res.json().catch(() => {});
        alert(errorData?.error || 'خطا در ویرایش دسته‌بندی');
      }
    } catch (error) {
      alert('ارتباط با سرور برقرار نشد');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-1">نام دسته‌بندی</label>
        <Input {...register('name')} />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">اسلاگ</label>
        <Input {...register('slug')} />
        {errors.slug && (
          <p className="text-red-500 text-sm mt-1">{errors.slug.message}</p>
        )}
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'در حال ذخیره...' : 'ذخیره تغییرات'}
      </Button>
    </form>
  );
}

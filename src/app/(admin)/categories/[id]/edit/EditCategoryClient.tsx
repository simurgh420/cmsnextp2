'use client';

import { Category } from '@/lib/types';
import { CategorySchema } from '@/lib/validations/category';
import { updateCategory } from '../../actions';
import { useNotify } from '@/lib/notify';
import CategoryForm from '@/components/categories/CategoryForm';

export default function EditCategoryClient({
  category,
}: {
  category: Category;
}) {
  const notify = useNotify();

  const handleSubmit = async (data: CategorySchema) => {
    try {
      await updateCategory(category.id, data);
      notify({
        title: 'موفقیت',
        message: '✅ دسته‌بندی با موفقیت ویرایش شد',
        type: 'success',
        duration: 5000,
      });
    } catch (error) {
      notify({
        title: 'خطا',
        message: '❌ ارتباط با سرور برقرار نشد',
        type: 'error',
        duration: Infinity,
      });
    }
  };

  return <CategoryForm initialData={category} onSubmit={handleSubmit} />;
}

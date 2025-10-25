'use client';

import { CategorySchema } from '@/lib/validations/category';
import { useNotify } from '@/lib/notify';
import  CategoryForm  from '@/components/categories/CategoryForm';
import { createCategory } from '../actions';

export default function NewCategoryClient() {
  const notify = useNotify();
  const handleSubmit = async (data: CategorySchema) => {
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
        message: '❌ ارتباط با سرور برقرار نشد',
        type: 'error',
        duration: Infinity,
      });
    }
  };

  return <CategoryForm onSubmit={handleSubmit} />;
}

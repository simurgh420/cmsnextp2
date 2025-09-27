import NewCategoryForm from '@/components/categories/new-category-form';

const NewCategoryPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">ایجاد دسته‌بندی جدید</h1>
      <NewCategoryForm />
    </div>
  );
};

export default NewCategoryPage;

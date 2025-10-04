import DeleteCategoryButton from '@/components/categories/DeleteCategoryButton';
import Link from 'next/link';
import { getCategories } from './actions';

const CategoriesPage = async () => {
  const categories = await getCategories();

  return (
    <div className="mx-auto max-w-3xl space-y-8 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">
          مدیریت دسته‌بندی‌ها
        </h1>
        <Link
          href="/categories/new"
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition hover:bg-primary/90"
        >
          + دسته‌بندی جدید
        </Link>
      </div>

      {/* Categories List */}
      <div className="overflow-hidden rounded-lg border bg-card shadow-sm">
        {categories.length === 0 ? (
          <p className="p-6 text-center text-muted-foreground">
            هیچ دسته‌بندی‌ای وجود ندارد
          </p>
        ) : (
          <ul className="divide-y divide-border">
            {categories.map((cate) => (
              <li
                key={cate.id}
                className="flex items-center justify-between px-6 py-4 hover:bg-accent"
              >
                <span className="text-foreground">{cate.name}</span>

                <Link
                  href={`/categories/${cate.id}/edit`}
                  className="text-sm font-medium text-primary hover:text-primary/80"
                >
                  ویرایش
                </Link>
                <DeleteCategoryButton id={cate.id} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CategoriesPage;

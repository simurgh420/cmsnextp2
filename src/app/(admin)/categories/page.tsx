import DeleteCategoryButton from '@/components/categories/DeleteCategoryButton';
import Link from 'next/link';
import { getCategories } from './actions';
import { auth } from '@clerk/nextjs/server';

const CategoriesPage = async () => {
  const categories = await getCategories();
  const { userId } = await auth();

  return (
    <div className="mx-auto max-w-3xl space-y-8 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">
          مدیریت دسته‌بندی‌ها
        </h1>
        {userId && (
          <Link
            href="/categories/new"
            className="rounded-full bg-gray-600  px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-gray-500"
          >
            + دسته‌بندی جدید
          </Link>
        )}
      </div>

      {/* Categories List */}
      <div className="overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-900 shadow-sm transition-colors duration-300">
        {categories.length === 0 ? (
          <p className="p-6 text-center text-muted-foreground">
            هیچ دسته‌بندی‌ای وجود ندارد
          </p>
        ) : (
          <ul className="divide-y divide-border">
            {categories.map((cate) => (
              <li
                key={cate.id}
                className="flex items-center justify-between px-6 py-4 hover:bg-accent/40 transition-colors"
              >
                <span className="text-foreground font-medium">{cate.name}</span>

                <div className="flex items-center gap-4">
                  {userId ? (
                    <Link
                      href={`/categories/${cate.id}/edit`}
                      className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors"
                    >
                      ویرایش
                    </Link>
                  ) : (
                    <span className="text-sm text-muted-foreground">
                      برای ویرایش وارد شوید
                    </span>
                  )}

                  <DeleteCategoryButton id={cate.id} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export const revalidate = 86400; // SSG: هر 24 ساعت
export default CategoriesPage;

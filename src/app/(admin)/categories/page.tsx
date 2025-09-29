import DeleteCategoryButton from '@/components/categories/DeleteCategoryButton';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

const CategoriesPage = async () => {
  const categories = await prisma.category.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="mx-auto max-w-3xl space-y-8 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          مدیریت دسته‌بندی‌ها
        </h1>
        <Link
          href="/categories/new"
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700"
        >
          + دسته‌بندی جدید
        </Link>
      </div>

      {/* Categories List */}
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        {categories.length === 0 ? (
          <p className="p-6 text-center text-gray-500">
            هیچ دسته‌بندی‌ای وجود ندارد
          </p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {categories.map((cate) => (
              <li
                key={cate.id}
                className="flex items-center justify-between px-6 py-4 hover:bg-gray-50"
              >
                <span className="text-gray-800">{cate.name}</span>
                <Link
                  href={`/categories/${cate.id}/edit`}
                  className="text-sm font-medium text-blue-600 hover:text-blue-800"
                >
                  ویرایش
                </Link>
                <Link
                  href={`/categories/${cate.id}/edit`}
                  className="text-sm font-medium text-blue-600 hover:text-blue-800"
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

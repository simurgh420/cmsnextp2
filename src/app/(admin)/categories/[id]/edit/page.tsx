import { prisma } from '@/lib/prisma';
import EditCategoryForm from '@/components/categories/edit-category-form';

export default async function EditCategoryPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const category = await prisma.category.findUnique({
    where: { id },
  });
  if (!category) {
    return (
      <div className="space-y-4">
        <h1 className="text-xl font-bold">دسته‌بندی یافت نشد</h1>
        <p>محصولی با شاناسه {params.id} یافت نشد </p>
      </div>
    );
  }
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">ویرایش دسته‌بندی</h1>
      <EditCategoryForm category={category} />
    </div>
  );
}

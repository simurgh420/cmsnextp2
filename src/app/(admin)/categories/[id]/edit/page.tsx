import { notFound } from 'next/navigation';
import { getCategory } from '../../actions';
import EditCategoryClient from './EditCategoryClient';

export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  if (!resolvedParams.id) {
    return notFound();
  }
  const { id } = resolvedParams;
  const category = await getCategory(id);
  if (!category) {
    return (
      <div className="space-y-4">
        <h1 className="text-xl font-bold">دسته‌بندی یافت نشد</h1>
        <p>محصولی با شاناسه {id} یافت نشد </p>
      </div>
    );
  }
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">ویرایش دسته‌بندی</h1>
      <EditCategoryClient category={category} />
    </div>
  );
}

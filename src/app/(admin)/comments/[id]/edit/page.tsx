
import { notFound } from 'next/navigation';

import { getProductsForSelect } from '@/app/(admin)/products/actions';
import { getCommentById } from '@/application/services/comments';

import EditCommentClient from './EditCommentClient';

export default async function EditCommentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  if (!resolvedParams.id) {
    return notFound();
  }
  const { id } = resolvedParams;
  const comment = await getCommentById(id);

  if (!comment) return <div>کامنت یافت نشد</div>;
  const products = await getProductsForSelect();
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">ویرایش کامنت</h1>
  <EditCommentClient comment={comment} products={products} />
    </div>
  );
}

import CommentForm from '../../_components/CommentForm';
import { notFound } from 'next/navigation';
import { updateCommentAction } from '../../actions';
import { getProductsForSelect } from '@/app/(admin)/products/actions';
import { getCommentById } from '@/application/services/comments';
import { CommentSchema } from '@/lib/validations/comment';

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
  async function actionWithId(data: CommentSchema) {
    'use server';
    await updateCommentAction(data, id);
  }
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">ویرایش کامنت</h1>
      <CommentForm
        products={products}
        initialData={{
          content: comment.content,
          userId: comment.userId ?? undefined,
          productId: comment.productId || '',
        }}
        action={actionWithId}
      />
    </div>
  );
}

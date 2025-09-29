import { prisma } from '@/lib/prisma';
import CommentForm from '../../_components/CommentForm';

export default async function EditCommentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const comment = await prisma.comment.findUnique({
    where: { id },
    include: { product: true },
  });
  const products = await prisma.product.findMany({
    select: { id: true, name: true },
  });
  if (!comment) return <div>کامنت یافت نشد</div>;
  async function handleUpdate(data: {
    content: string;
    userId: string;
    productId: string;
  }) {
    await prisma.comment.update({
      where: { id },
      data,
    });
  }
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">ویرایش کامنت</h1>
      <CommentForm
        products={products}
        initialData={{
          content: comment.content,
          userId: comment.userId,
          productId: comment.productId || '',
        }}
        onSubmit={handleUpdate}
      />
    </div>
  );
}

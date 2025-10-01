import { prisma } from '@/lib/prisma';
import CommentForm from '../../_components/CommentForm';
import { notFound } from 'next/navigation';

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
    userId?: string | null;
    productId: string;
  }) {
    'use server'; // 👈 این خط خیلی مهمه
    await prisma.comment.update({
      where: { id },
      data: {
        content: data.content,
        userId: data.userId ?? null, // 👈 اگر undefined بود، null ذخیره بشه
        productId: data.productId,
      },
    });
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
        onSubmit={handleUpdate}
      />
    </div>
  );
}

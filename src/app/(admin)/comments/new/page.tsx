import { createComment } from '@/application/services/comments';
import CommentForm from '../_components/CommentForm';
import { prisma } from '@/lib/prisma';

export default async function NewCommentPage() {
  const products = await prisma.product.findMany({
    select: { id: true, name: true },
  });

  async function handleCreate(data: {
    content: string;
    userId?: string | null;
    productId: string;
  }) {
    'use server';
    await createComment({
      content: data.content,
      userId: data.userId ?? null, // 👈 اگر undefined بود، null میشه
      productId: data.productId,
    });
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">ایجاد کامنت جدید</h1>
      <CommentForm products={products} onSubmit={handleCreate} />
    </div>
  );
}

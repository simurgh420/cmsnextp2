import { createComment } from '@/application/services/comments';
import CommentForm from '../_components/CommentForm';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
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
    const { userId } = await auth();
    await createComment({
      content: data.content,
      userId: userId ?? null, // 👈 اگر undefined بود، null میشه
      productId: data.productId,
      
    });
    revalidatePath('/comments');
    console.log("userId from Clerk:", userId);
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">ایجاد کامنت جدید</h1>
      <CommentForm products={products} onSubmit={handleCreate} />
    </div>
  );
}

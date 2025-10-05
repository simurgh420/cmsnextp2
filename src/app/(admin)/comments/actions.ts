'use server';

import { commentSchema, CommentSchema } from '@/lib/validations/comment';
import { revalidatePath } from 'next/cache';
import { CommentStatus } from '@prisma/client';
import { auth } from '@clerk/nextjs/server';
import {
  createComment,
  deleteComment,
  getCommentById,
  listAllComments,
  listCommentsByProduct,
  updateComment,
  updateCommentStatus,
} from '@/application/services/comments';

// 📌 لیست همه کامنت‌ها
export async function getAllCommentsAction(
  page: number = 1,
  pageSize: number = 5,
) {
  return listAllComments(page, pageSize);
}

// 📌 لیست کامنت‌های یک محصول (فقط APPROVED)
export async function getCommentsByProductAction(productId: string) {
  return listCommentsByProduct(productId);
}
export async function getCommentByIdAction(id: string) {
  return getCommentById(id);
}

// 📌 ایجاد کامنت جدید

export async function createCommentAction(formData: CommentSchema) {
  const data = commentSchema.parse(formData);
  const { userId } = await auth();
  await createComment({
    content: data.content,
    userId: userId ?? null,
    productId: data.productId,
  });
  revalidatePath(`/products/${data.productId}`);
}

// 📌 ویرایش متن کامنت

export async function updateCommentAction(formData: CommentSchema, id: string) {
  const parsed = commentSchema.parse(formData);

  await updateComment({
    id,
    content: parsed.content,
    productId: parsed.productId,
    userId: parsed.userId ?? null,
  });

  revalidatePath('/comments');
}
// 📌 تغییر وضعیت

export async function updateCommentStatusAction(
  id: string,
  status: CommentStatus,
) {
  await updateCommentStatus(id, status);
  revalidatePath('/comments');
}
// 📌 اکشن سریع (approve/reject/delete)

export async function commentQuickAction(
  id: string,
  action: 'approve' | 'reject' | 'delete',
) {
  if (action === 'approve') {
    await updateCommentStatus(id, CommentStatus.APPROVED);
  } else if (action === 'reject') {
    await updateCommentStatus(id, CommentStatus.REJECTED);
  } else if (action === 'delete') {
    await deleteComment(id);
  }

  revalidatePath('/comments');
}
// 📌 حذف کامنت
export async function deleteCommentAction(id: string) {
  await deleteComment(id);

  revalidatePath('/comments');
}

import { prisma } from '@/lib/prisma';
import { CommentStatus } from '@prisma/client';

// لیست کامنت‌های تأیید شده برای یک محصول
export async function listCommentsByProduct(productId: string) {
  return prisma.comment.findMany({
    where: { productId, status: 'APPROVED' },
    orderBy: { createdAt: 'desc' },
  });
}

// لیست همه کامنت‌ها (ادمین → شامل Pending و Rejected)
export async function listAllComments() {
  return prisma.comment.findMany({
    orderBy: { createdAt: 'desc' },
    include: { product: true }, // برای نمایش نام محصول همزمان
  });
}

// ایجاد کامنت جدید
export async function createComment({
  content,
  userId,
  productId,
}: {
  content: string;
  userId: string | null;
  productId: string;
}) {
  return prisma.comment.create({
    data: {
      content,
      userId,
      productId,
      status: 'PENDING', // پیش‌فرض: در انتظار تأیید
    },
  });
}

// ویرایش متن کامنت (فقط صاحب کامنت یا ادمین)
export async function updateComment(id: string, content: string) {
  return prisma.comment.update({
    where: { id },
    data: { content },
  });
}

// تغییر وضعیت (ادمین → تأیید یا رد)
export async function updateCommentStatus(id: string, status: CommentStatus) {
  return prisma.comment.update({
    where: { id },
    data: { status },
  });
}

// حذف کامنت
export async function deleteComment(id: string) {
  return prisma.comment.delete({
    where: { id },
  });
}

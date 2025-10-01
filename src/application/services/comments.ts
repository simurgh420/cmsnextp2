import { prisma } from '@/lib/prisma';
import { CommentStatus } from '@prisma/client';
import { clerkClient } from '@clerk/nextjs/server';
import type { User } from '@clerk/nextjs/server';
import { UpdateCommentInput } from '@/lib/types';

// لیست کامنت‌های تأیید شده برای یک محصول
export async function listCommentsByProduct(productId: string) {
  return await prisma.comment.findMany({
    where: { productId, status: 'APPROVED' },
    orderBy: { createdAt: 'desc' },
  });
}
// گرفتن کامنت با ایدی همرا اسم ایدی محصول
export async function getCommentById(id: string) {
  return await prisma.comment.findUnique({
    where: { id },
    include: {
      product: {
        select: { id: true, name: true },
      },
    },
  });
}

// لیست همه کامنت‌ها (ادمین → شامل Pending و Rejected)
export async function listAllComments() {
  const comments = await prisma.comment.findMany({
    orderBy: { createdAt: 'desc' },
    include: { product: true }, // برای نمایش نام محصول همزمان
  });
  const userIds = comments.map((c) => c.userId).filter(Boolean) as string[];
  const client = await clerkClient();
  const { data: users } = await client.users.getUserList({
    userId: userIds,
  });

  return comments.map((c) => ({
    ...c,
    userName:
      users.find((u: User) => u.id === c.userId)?.fullName ?? 'کاربر ناشناس',
  }));
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
export async function updateComment(input: UpdateCommentInput) {
  const { id, ...data } = input;
  return prisma.comment.update({
    where: { id },
    data,
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

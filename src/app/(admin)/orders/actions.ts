'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server'; // برای گرفتن userId
import { OrderStatus } from '@prisma/client';
import { orderSchema } from '@/lib/validations/order';
// گرفتن سفارش ها
export async function getOrders() {
  const { userId } = await auth();
  if (!userId) throw new Error('کاربر احراز هویت نشده است');
  // اگر بخوای فقط سفارش‌های کاربر لاگین‌شده رو بیاری:
  const orders = await prisma.order.findMany({
    where: { userId },
    include: { product: true },
    orderBy: { createdAt: 'desc' },
  });
  return orders;
}
export async function getOrderById(id: string) {
  const order = await prisma.order.findUnique({
    where: { id },
    include: { product: true },
  });
  return order;
}

// 🟢 ایجاد سفارش جدید
export async function createOrder(formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error('کاربر احراز هویت نشده است');
  const rawData = {
    productId: formData.get('productId'),
    quantity: Number(formData.get('quantity')),
    status: formData.get('status') || OrderStatus.PENDING,
  };
  const parsed = orderSchema.safeParse(rawData);
  if (!parsed.success) {
    throw new Error('اطلاعات سفارش نامعتبر است');
  }

  await prisma.order.create({
    data: {
      ...parsed.data,
      userId,
    },
  });
  revalidatePath('/orders');
  redirect('/orders');
}
// 🟡 ویرایش سفارش
export async function updateOrder(formData: FormData) {
  const orderId = formData.get('orderId') as string;
  if (!orderId) throw new Error('شناسه سفارش الزامی است');

  const rawData = {
    productId: formData.get('productId'),
    quantity: Number(formData.get('quantity')),
    status: formData.get('status'),
  };
  
  const parsed = orderSchema.safeParse(rawData);
  if (!parsed.success) {
    throw new Error('اطلاعات سفارش نامعتبر است');
  }

  await prisma.order.update({
    where: { id: orderId },
    data: parsed.data,
  });
  
  revalidatePath('/orders');
  redirect('/orders');
}

// 🔴 حذف سفارش
export async function deleteOrder(id: string) {
  await prisma.order.delete({
    where: { id },
  });
  revalidatePath('/orders');
}

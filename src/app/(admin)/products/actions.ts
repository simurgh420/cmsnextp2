'use server';

import { prisma } from '@/lib/prisma';
import { productSchema, ProductSchema } from '@/lib/validations/product';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
// 📌 گرفتن همه محصولات و عمال کردن پیجینیشن

export async function getProducts(page: number = 1, pageSize: number = 5) {
  const [items, total] = await Promise.all([
    prisma.product.findMany({
      include: { category: true },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.product.count(),
  ]);

  return {
    items,
    total,
    totalPages: Math.ceil(total / pageSize),
    page,
    pageSize,
  };
}
//📌 گرفتن اسم و ایدی محصول فقط
export async function getProductsForSelect() {
  return prisma.product.findMany({
    select: { id: true, name: true, price: true },
    orderBy: { name: 'asc' },
  });
}
// 📌 گرفتن یک محصول خاص
export async function getProduct(id: string) {
  const product = await prisma.product.findUnique({
    where: { id },
    include: { category: true },
  });
  if (!product) throw new Error('محصول یافت نشد');
  return product;
}
// 📌 ایجاد محصول جدید
export async function createProduct(data: ProductSchema) {
  const validated = productSchema.parse(data);
  await prisma.product.create({
    data: {
      name: validated.name,
      price: validated.price,
      status: validated.status,
      image: validated.image ?? null,
      categoryId: validated.categoryId,
    },
  });
  revalidatePath('/products');
  redirect('/products');
}

// 📌 ویرایش محصول

export async function updateProduct(id: string, data: ProductSchema) {
  const validated = productSchema.parse(data);
  return await prisma.product.update({
    where: { id },
    data: {
      name: validated.name,
      price: validated.price,
      status: validated.status,
      image: validated.image ?? null,
      categoryId: validated.categoryId,
    },
  });
}

// 📌 حذف محصول

export async function deleteProduct(id: string) {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');
  await prisma.product.delete({
    where: { id },
  });
  revalidatePath('/products');
  redirect('/products');
}

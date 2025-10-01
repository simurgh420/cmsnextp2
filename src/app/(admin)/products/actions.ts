'use server';

// 📌 گرفتن همه محصولات

import { prisma } from '@/lib/prisma';
import { productSchema, ProductSchema } from '@/lib/validations/product';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function getProducts() {
  return await prisma.product.findMany({
    include: { category: true },
    orderBy: {
      createdAt: 'desc',
    },
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
  await prisma.product.delete({
    where: { id },
  });
  revalidatePath('/products');
  redirect('/products');
}

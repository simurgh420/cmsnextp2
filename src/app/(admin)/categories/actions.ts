'use server';
import { prisma } from '@/lib/prisma';
import { categorySchema, CategorySchema } from '@/lib/validations/category';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

// 📌 گرفتن همه دسته‌بندی‌ها

export async function getCategories() {
  return await prisma.category.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
}
// 📌 گرفتن یک دسته‌بندی خاص

export async function getCategory(id: string) {
  const category = await prisma.category.findUnique({
    where: { id },
  });
  if (!category) throw new Error('دسته‌بندی یافت نشد');
  return category;
}

// 📌 ایجاد دسته‌بندی جدید

export async function createCategory(data: CategorySchema) {
  const validated = categorySchema.parse(data);
  await prisma.category.create({
    data: validated,
  });
  revalidatePath('categories');
}
// 📌 ویرایش دسته‌بندی

export async function updateCategory(id: string, data: CategorySchema) {
  const validated = categorySchema.parse(data);
  await prisma.category.update({
    where: { id },
    data: validated,
  });
  revalidatePath('categories');
}
// 📌 حذف دسته‌بندی

export async function deleteCategory(id: string) {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');
  await prisma.category.delete({
    where: { id },
  });
  revalidatePath('/categories');
}

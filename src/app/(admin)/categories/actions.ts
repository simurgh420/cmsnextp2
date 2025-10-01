'use server';
import { prisma } from '@/lib/prisma';
import { categorySchema, CategorySchema } from '@/lib/validations/category';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

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
  await prisma.category.delete({
    where: { id },
  });
  revalidatePath('/categories');
}

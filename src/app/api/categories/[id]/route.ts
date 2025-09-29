import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { categorySchema } from '@/lib/validations/category';
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    const body = await req.json();
    const data = categorySchema.parse(body);
    const category = await prisma.category.update({
      where: { id },
      data,
    });
    return NextResponse.json(category);
  } catch (eroor) {
    console.error('PUT /categories/[id] error:', eroor);
    if (eroor instanceof Error && 'issues' in eroor) {
      return NextResponse.json(
        { error: 'داده نامعتبر است', detaile: eroor.issues },
        { status: 400 },
      );
    }
  }
}
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    await prisma.category.delete({
      where: { id },
    });
    return NextResponse.json({ message: 'دسته‌بندی حذف شد' });
  } catch (eroor) {
    console.error('DELETE /categories/[id] error:', eroor);
    return NextResponse.json({ eroor: 'خطای داخلی سرور' }, { status: 500 });
  }
}

import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  const { id } = await params;
  try {
    const body = await req.json();
    const category = await prisma.category.update({
      where: { id },
      data: {
        name: body.name,
        slug: body.slug,
      },
    });
    return NextResponse.json(category);
  } catch (eroor) {
    console.error('PUT /categories/[id] error:', eroor);
    return NextResponse.json({ eroor: 'خطای داخلی سرور' }, { status: 500 });
  }
}
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
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

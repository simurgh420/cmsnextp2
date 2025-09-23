import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const product = await prisma.product.findUnique({
    where: { id },
  });
  if (!product) {
    return NextResponse.json({ error: 'محصول یافت نشد' }, { status: 404 });
  }
  return NextResponse.json(product);
}
// ویرایش محصول

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const body = await req.json();
  const { id } = await context.params;
  const product = await prisma.product.update({
    where: { id },
    data: {
      name: body.name,
      price: body.price,
      status: body.status,
      image: body.image ?? null,
    },
  });
  return NextResponse.json(product);
}
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  await prisma.product.delete({
    where: { id },
  });
  return NextResponse.json({ message: 'محصول حذف شد' });
}

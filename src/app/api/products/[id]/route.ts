import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { productSchema } from '@/lib/validations/product';
import { ZodError } from 'zod';
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const product = await prisma.product.findUnique({
      where: { id },
      include: { category: true, comments: true },
    });
    if (!product) {
      return NextResponse.json({ error: 'محصول یافت نشد' }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch (error) {
    console.error('GET /products/[id] error:', error);
    return NextResponse.json({ error: 'خطای داخلی سرور' }, { status: 500 });
  }
}
// ویرایش محصول

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const body = await req.json();
    const data = productSchema.parse(body);
    const { id } = await params;
    const product = await prisma.product.update({
      where: { id },
      data: {
        name: data.name,
        price: data.price,
        status: data.status,
        image: data.image ?? null,
        categoryId: data.categoryId,
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    console.error('PUT /products/[id] error:', error);
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'داده نامعتبر است', details: error.issues },
        { status: 400 },
      );
    }
    return NextResponse.json({ error: 'خطای داخلی سرور' }, { status: 500 });
  }
}
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    await prisma.product.delete({
      where: { id },
    });
    return NextResponse.json({ message: 'محصول حذف شد' });
  } catch (error) {
    console.error('DELETE /products/[id] error:', error);
    return NextResponse.json({ error: 'خطای داخلی سرور' }, { status: 500 });
  }
}

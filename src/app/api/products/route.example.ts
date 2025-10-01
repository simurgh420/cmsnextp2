// روش سنتی نوشته شده با API ROUTE

import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { productSchema } from '@/lib/validations/product';
import { ZodError } from 'zod';

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: { category: true },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(products);
  } catch (error) {
    console.error('GET /products error:', error);
    return NextResponse.json({ error: 'خطای داخلی سرور' }, { status: 500 });
  }
}
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = productSchema.parse(body);
    const product = await prisma.product.create({
      data: {
        name: data.name,
        price: data.price,
        status: data.status,
        image: data.image ?? null,
        categoryId: data.categoryId,
      },
    });
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('POST /products error:', error);
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'داده نامعتبر است', details: error.issues },
        { status: 400 },
      );
    }
    return NextResponse.json({ error: 'خطای داخلی سرور' }, { status: 500 });
  }
}

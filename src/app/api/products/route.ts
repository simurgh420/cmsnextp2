import { prisma } from '@/lib/prisma';

import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const products = await prisma.product.findMany();
    return NextResponse.json(products);
  } catch (error) {
    console.error('GET /products error:', error);
    return NextResponse.json({ error: 'خطای داخلی سرور' }, { status: 500 });
  }
}
export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.name || !body.price || !body.status) {
      return NextResponse.json(
        { error: 'اطلاعات ارسالی ناقص است' },
        { status: 400 },
      );
    }
    const product = await prisma.product.create({
      data: {
        name: body.name,
        price: body.price,
        status: body.status,
        image: body.image ?? null,
      },
    });
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('POST /products error:', error);
    return NextResponse.json({ error: 'خطای داخلی سرور' }, { status: 500 });
  }
}

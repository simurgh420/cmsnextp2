import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const products = await prisma.product.findMany();

  return NextResponse.json(products);
}
export async function POST(req: Request) {
  const body = await req.json();
  const product = await prisma.product.create({
    data: {
      name: body.name,
      price: body.price,
      status: body.status,
      image: body.image ?? null,
    },
  });
  return NextResponse.json(product, { status: 200 });
}

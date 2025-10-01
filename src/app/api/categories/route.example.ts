//روش api route

import { prisma } from '@/lib/prisma';
import { categorySchema } from '@/lib/validations/category';
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(categories);
  } catch (error) {
    console.error('GET /categories error:', error);
    return NextResponse.json({ error: 'خطای داخلی سرور' }, { status: 500 });
  }
}
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = categorySchema.parse(body);

    const category = await prisma.category.create({
      data,
    });
    return NextResponse.json(category, { status: 200 });
  } catch (eroor) {
    console.error('POST /categories error:', eroor);
    if (eroor instanceof ZodError) {
      return NextResponse.json(
        {
          eroor: 'داده نامعتبر است',
          details: eroor.issues,
        },
        { status: 400 },
      );
    }
    return NextResponse.json({ eroor: 'خطای داخلی سرور' }, { status: 500 });
  }
}

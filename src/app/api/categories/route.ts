import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

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
    if (!body.name || !body.slug) {
      return NextResponse.json(
        { error: 'نام و اسلاگ الزامی است' },
        { status: 400 },
      );
    }
    const category = await prisma.category.create({
      data: {
        name: body.name,
        slug: body.slug,
      },
    });
    return NextResponse.json(category, { status: 200 });
  } catch (eroor) {
    console.error('POST /categories error:', eroor);
    return NextResponse.json({ eroor: 'خطای داخلی سرور' }, { status: 500 });
  }
}

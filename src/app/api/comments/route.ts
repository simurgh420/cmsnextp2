import { NextResponse } from 'next/server';
import {
  createComment,
  listAllComments,
  listCommentsByProduct,
} from '@/application/services/comments';
import { commentSchema } from '@/lib/validations/comment';
import { ZodError } from 'zod';
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get('productId');
    if (productId) {
      // فقط کامنت‌های یک محصول
      const comments = await listCommentsByProduct(productId);
      return NextResponse.json(comments);
    }
    // اگر productId نبود → همه کامنت‌ها (ادمین)
    const comments = await listAllComments();
    return NextResponse.json(comments);
  } catch (error) {
    return NextResponse.json({ error: 'خطای سرور' }, { status: 500 });
  }
}
// POST /comments
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = commentSchema.parse(body);
    const newComment = await createComment({
      content: data.content,
      userId: data.userId ?? null, // 👈 اگر undefined بود، null ذخیره میشه
      productId: data.productId,
    });
    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'داده نامعتبر است', details: error.issues },
        { status: 400 },
      );
    }
    return NextResponse.json({ error: 'خطای سرور' }, { status: 500 });
  }
}

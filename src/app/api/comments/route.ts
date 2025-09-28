import { NextResponse } from 'next/server';
import {
  createComment,
  listAllComments,
  listCommentsByProduct,
} from '@/application/services/comments';
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

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.content || !body.userId || !body.productId) {
      return NextResponse.json({ error: 'اطلاعات ناقص است' }, { status: 400 });
    }
    const newComment = await createComment({
      content: body.content,
      userId: body.userId,
      productId: body.productId,
    });
    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'خطا سرور' }, { status: 500 });
  }
}

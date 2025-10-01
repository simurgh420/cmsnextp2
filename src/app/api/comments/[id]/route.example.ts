//روش api route

import { NextResponse } from 'next/server';
import {
  updateComment,
  updateCommentStatus,
  deleteComment,
} from '@/application/services/comments';
import { CommentStatus } from '@prisma/client';
import {
  updateCommentSchema,
  commentActionSchema,
} from '@/lib/validations/comment';
import { ZodError } from 'zod';
// PUT /comments/[id] → ویرایش متن یا وضعیت
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const data = updateCommentSchema.parse(body);
    if (data.content) {
      const updated = await updateComment({ id, content: data.content });
      return NextResponse.json(updated);
    }
    if (data.status) {
      const updated = await updateCommentStatus(id, data.status);
      return NextResponse.json(updated);
    }
    return NextResponse.json({ error: 'ورودی معتبر نیست' }, { status: 400 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'داده نامعتبر است', details: error.issues },
        { status: 400 },
      );
    }
    return NextResponse.json({ error: 'خطای داخلی سرور' }, { status: 500 });
  }
}
// PATCH /comments/[id] → اکشن‌های سریع (approve/reject/delete)
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { action } = commentActionSchema.parse(body);
    if (action === 'approve') {
      await updateCommentStatus(id, CommentStatus.APPROVED);
      return NextResponse.json({ message: 'کامنت تایید شد' });
    } else if (action === 'reject') {
      await updateCommentStatus(id, CommentStatus.REJECTED);
      return NextResponse.json({ message: 'کامنت رد شد' });
    } else if (action === 'delete') {
      await deleteComment(id);
    } else {
      return NextResponse.json({ error: 'اکشن نامعتبر است' }, { status: 400 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'اکشن نامعتبر است', details: error.issues },
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
    await deleteComment(id);
    return NextResponse.json({ message: 'کامنت حذف شد' });
  } catch (error) {
    return NextResponse.json({ error: 'خطا سرور' }, { status: 500 });
  }
}

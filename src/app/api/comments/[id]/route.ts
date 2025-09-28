import { NextResponse } from 'next/server';
import {
  updateComment,
  updateCommentStatus,
  deleteComment,
} from '@/application/services/comments';
import { CommentStatus } from '@prisma/client';

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await req.json();
    if (body.content) {
      const updated = await updateComment(id, body.content);
      return NextResponse.json(updated);
    }
    if (body.status && Object.values(CommentStatus).includes(body.status)) {
      const updated = await updateCommentStatus(id, body.status);
      return NextResponse.json(updated);
    }
    return NextResponse.json({ error: 'ورودی معتبر نیست' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: 'خطای سرور' }, { status: 500 });
  }
}
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const { action } = await req.json();
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
    return NextResponse.json({ error: 'خطای سرور' }, { status: 500 });
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

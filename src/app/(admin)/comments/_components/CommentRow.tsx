'use client';

import { Comment, Product } from '@prisma/client';
import { TableCell, TableRow } from '@/components/ui/table';
import CommentActions from './CommentActions';

type CommentWithExtras = Comment & {
  product?: Product | null;
  userName?: string; // 👈 اضافه شد
};

export default function CommentRow({
  comment,
}: {
  comment: CommentWithExtras;
}) {
  return (
    <TableRow>
      <TableCell className="text-right">
        {comment.userName ?? 'کاربر ناشناس'}
      </TableCell>
      <TableCell className="text-right">{comment.content}</TableCell>
      <TableCell className="text-right">
        {comment.product?.name ?? '—'}
      </TableCell>
      <TableCell className="text-right">{comment.status}</TableCell>
      <TableCell className="text-right">
        <CommentActions id={comment.id} />
      </TableCell>
    </TableRow>
  );
}

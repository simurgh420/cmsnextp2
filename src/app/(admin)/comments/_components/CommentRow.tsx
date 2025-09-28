'use client';

import { Comment, Product } from '@prisma/client';
import { TableCell, TableRow } from '@/components/ui/table';
import CommentActions from './CommentActions';

type CommentWithProduct = Comment & { product?: Product | null };

export default function CommentRow({
  comment,
}: {
  comment: CommentWithProduct;
}) {
  return (
    <TableRow>
      <TableCell className="text-right">{comment.userId}</TableCell>
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

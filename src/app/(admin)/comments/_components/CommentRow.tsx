import { TableCell, TableRow } from '@/components/ui';
import CommentActions from './CommentActions';
import { CommentWithExtras } from '@/lib/types';
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

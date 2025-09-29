'use client';

import { Comment, Product } from '@prisma/client';
import {
  Table,
  TableBody,
  TableHeader,
  TableHead,
  TableRow,
} from '@/components/ui/table';
import CommentRow from './CommentRow';

type CommentWithExtras = Comment & {
  product?: Product | null;
  userName?: string; // 👈 اضافه شد
};

export default function CommentsTable({
  comments,
}: {
  comments: CommentWithExtras[];
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-right">کاربر</TableHead>
          <TableHead className="text-right">متن</TableHead>
          <TableHead className="text-right">محصول</TableHead>
          <TableHead className="text-right">وضعیت</TableHead>
          <TableHead className="text-right">عملیات</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {comments.map((c) => (
          <CommentRow key={c.id} comment={c} />
        ))}
      </TableBody>
    </Table>
  );
}

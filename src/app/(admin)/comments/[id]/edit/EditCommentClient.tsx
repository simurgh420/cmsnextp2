'use client';

import { Comment } from '@prisma/client';
import { CommentSchema } from '@/lib/validations/comment';
import { updateCommentAction } from '../../actions';
import { useNotify } from '@/lib/notify';
import CommentForm from '../../_components/CommentForm';

interface Props {
  comment: Comment;
  products: { id: string; name: string }[];
}

export default function EditCommentClient({ comment, products }: Props) {
  const notify = useNotify();

  const handleSubmit = async (data: CommentSchema) => {
    try {
      await updateCommentAction(data, comment.id);
      notify({
        title: 'موفقیت',
        message: '✅ کامنت با موفقیت ویرایش شد',
        type: 'success',
        duration: 5000,
      });
    } catch (error) {
      notify({
        title: 'خطا',
        message: '❌ خطا در ویرایش کامنت',
        type: 'error',
        duration: Infinity,
      });
    }
  };

  return (
    <CommentForm
      products={products}
      initialData={{
        content: comment.content,
        productId: comment.productId ?? undefined,
      }}
      onSubmit={handleSubmit}
    />
  );
}

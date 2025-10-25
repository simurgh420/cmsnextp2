'use client';

import { CommentSchema } from '@/lib/validations/comment';
import { createCommentAction } from '../actions';
import { useNotify } from '@/lib/notify';
import CommentForm from '../_components/CommentForm';

export default function NewCommentClient({
  products,
}: {
  products: { id: string; name: string }[];
}) {
  const notify = useNotify();

  const handleSubmit = async (data: CommentSchema) => {
    try {
      await createCommentAction(data);
      notify({
        title: 'موفقیت',
        message: '✅ کامنت با موفقیت ثبت شد',
        type: 'success',
        duration: 5000,
      });
    } catch {
      notify({
        title: 'خطا',
        message: '❌ خطا در ثبت کامنت',
        type: 'error',
        duration: Infinity,
      });
    }
  };

  return <CommentForm products={products} onSubmit={handleSubmit} />;
}

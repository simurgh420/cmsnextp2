import CommentForm from '../_components/CommentForm';
import { createCommentAction } from '../actions';
import { getProductsForSelect } from '../../products/actions';
export default async function NewCommentPage() {
  const products = await getProductsForSelect();

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">ایجاد کامنت جدید</h1>
      <CommentForm products={products} action={createCommentAction} />
    </div>
  );
}

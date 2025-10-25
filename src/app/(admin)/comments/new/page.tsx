import { getProductsForSelect } from '../../products/actions';
import NewCommentClient from './NewCommentClient';

export default async function NewCommentPage() {
  const products = await getProductsForSelect();

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">ایجاد کامنت جدید</h1>
      <NewCommentClient products={products} />
    </div>
  );
}

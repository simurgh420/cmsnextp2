import { notFound } from 'next/navigation';
import { getOrderById } from '../../actions';
import { getProductsForSelect } from '@/app/(admin)/products/actions';
import EditOrderClient from './EditOrderClient';

export default async function EditOrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = await getOrderById(id);
  if (!order) return notFound();

  const products = await getProductsForSelect();

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold">ویرایش سفارش</h1>
      <EditOrderClient products={products} order={order} />
    </div>
  );
}

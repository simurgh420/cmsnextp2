import { notFound } from 'next/navigation';
import { getOrderById, updateOrder } from '../../actions';
import { getProductsForSelect } from '@/app/(admin)/products/actions';
import OrderForm from '@/components/orders/OrderForm';

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
      <OrderForm
        products={products}
        defaultValues={{
          productId: order.productId,
          quantity: order.quantity,
          status: order.status,
        }}
        action={updateOrder}
        isEdit={true}
        orderId={id}
      />
    </div>
  );
}

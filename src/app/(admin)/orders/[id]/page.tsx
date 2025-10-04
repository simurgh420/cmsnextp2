import { notFound } from 'next/navigation';
import { getOrderById } from '../actions';

const OrderDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const order = await getOrderById(id);
  if (!order) return notFound();
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">جزئیات سفارش</h1>
      <p>
        <strong>شناسه:</strong> {order.id}
      </p>
      <p>
        <strong>محصول:</strong> {order.product.name}
      </p>
      <p>
        <strong>تعداد:</strong> {order.quantity}
      </p>
      <p>
        <strong>وضعیت:</strong> {order.status}
      </p>
      <p>
        <strong>تاریخ:</strong> {order.createdAt.toLocaleString()}
      </p>
    </div>
  );
};

export default OrderDetailPage;

'use client';

import { useTransition } from 'react';
import { OrderSchemaInput } from '@/lib/validations/order';
import { updateOrder } from '../../actions';
import { useNotify } from '@/lib/notify';
import OrderForm from '@/components/orders/OrderForm';

export default function EditOrderClient({
  products,
  order,
}: {
  products: { id: string; name: string; price: number }[];
  order: { id: string; productId: string; quantity: number; status: string };
}) {
  const [isPending, startTransition] = useTransition();
  const notify = useNotify();

  const handleSubmit = async (data: OrderSchemaInput) => {
    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append('orderId', order.id);
        formData.append('productId', data.productId);
        formData.append('quantity', String(data.quantity));
        formData.append('status', data.status ?? 'PENDING');

        await updateOrder(formData);

        notify({
          title: 'موفقیت',
          message: '✅ سفارش با موفقیت ویرایش شد',
          type: 'success',
          duration: 5000,
        });
      } catch {
        notify({
          title: 'خطا',
          message: '❌ خطا در ویرایش سفارش',
          type: 'error',
          duration: Infinity,
        });
      }
    });
  };

  return (
    <OrderForm
      products={products}
      defaultValues={{
        productId: order.productId,
        quantity: order.quantity,
        status: order.status as 'PENDING' | 'PAID' | 'SHIPPED' | 'CANCELLED',
      }}
      isPending={isPending}
      onSubmit={handleSubmit}
    />
  );
}

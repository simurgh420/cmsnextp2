'use client';

import { useTransition } from 'react';
import { OrderSchemaInput } from '@/lib/validations/order';
import { createOrder } from '../actions';
import { useNotify } from '@/lib/notify';
import OrderForm from '@/components/orders/OrderForm';

export default function NewOrderClient({
  products,
}: {
  products: { id: string; name: string; price: number }[];
}) {
  const [isPending, startTransition] = useTransition();
  const notify = useNotify();

  const handleSubmit = async (data: OrderSchemaInput) => {
    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append('productId', data.productId);
        formData.append('quantity', String(data.quantity));
        formData.append('status', data.status ?? 'PENDING');

        await createOrder(formData);

        notify({
          title: 'موفقیت',
          message: '✅ سفارش با موفقیت ثبت شد',
          type: 'success',
          duration: 5000,
        });
      } catch {
        notify({
          title: 'خطا',
          message: '❌ خطا در ثبت سفارش',
          type: 'error',
          duration: Infinity,
        });
      }
    });
  };

  return (
    <OrderForm
      products={products}
      onSubmit={handleSubmit}
      isPending={isPending} // 👈 اینجا پاس داده می‌شه
    />
  );
}

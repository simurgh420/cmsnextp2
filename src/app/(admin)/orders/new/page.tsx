import { getProductsForSelect } from '@/app/(admin)/products/actions';
import OrderForm from '@/components/orders/OrderForm';
import { createOrder } from '../actions';
import { Suspense } from 'react';
export default async function NewOrderPage() {
  const products = await getProductsForSelect();

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold">ایجاد سفارش جدید</h1>
      <Suspense fallback={<div>در حال بارگذاری فرم...</div>}>
        <OrderForm products={products} action={createOrder} />
      </Suspense>
    </div>
  );
}

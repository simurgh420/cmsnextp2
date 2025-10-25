import { getProductsForSelect } from '@/app/(admin)/products/actions';
import { Suspense } from 'react';
import NewOrderClient from './NewOrderClient';
export default async function NewOrderPage() {
  const products = await getProductsForSelect();

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold">ایجاد سفارش جدید</h1>
      <Suspense fallback={<div>در حال بارگذاری فرم...</div>}>
          <NewOrderClient products={products} />
      </Suspense>
    </div>
  );
}

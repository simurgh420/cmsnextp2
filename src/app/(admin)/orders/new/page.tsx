import { getProductsForSelect } from '@/app/(admin)/products/actions';
import OrderForm from '@/components/orders/OrderForm';
import { createOrder } from '../actions';
export default async function NewOrderPage() {
  const products = await getProductsForSelect();

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold">ایجاد سفارش جدید</h1>
      <OrderForm products={products} action={createOrder} />
    </div>
  );
}

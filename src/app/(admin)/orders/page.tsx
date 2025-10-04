import OrderTable from '@/components/orders/OrderTable';
import { getOrders } from './actions';

const OrdersPage = async () => {
  const orders = await getOrders();
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold">مدیریت سفارش‌ها</h1>
      <OrderTable orders={orders} />
    </div>
  );
};

export default OrdersPage;

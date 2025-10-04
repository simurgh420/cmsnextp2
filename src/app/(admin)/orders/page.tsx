import OrderTable from '@/components/orders/OrderTable';
import { getOrders } from './actions';
import Link from 'next/link';
import { FaPlus } from 'react-icons/fa';
import { Button } from '@/components/ui/button';

const OrdersPage = async () => {
  const orders = await getOrders();
  return (
    <div className="space-y-6">
      <Link href={'/orders/new'}>
        <Button className="flex items-center gap-2">
          <FaPlus size={16} />
          افزودن سفارش جدید
        </Button>
      </Link>
      <h1 className="text-xl font-bold">مدیریت سفارش‌ها</h1>
      <OrderTable orders={orders} />
    </div>
  );
};

export default OrdersPage;

import OrderTable from '@/components/orders/OrderTable';
import { getOrders } from './actions';
import Link from 'next/link';
import { FaPlus } from 'react-icons/fa';
import { Button } from '@/components/ui';
import { Suspense } from 'react';
import { OrderTableSkeleton } from '@/components/orders/order-table-skeleton';
import { Pagination } from '@/components/Pagination';
import { auth } from '@clerk/nextjs/server';

const OrdersPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: number; pageSize?: number }>;
}) => {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const pageSize = Number(params.pageSize) || 5;
  const { items, totalPages } = await getOrders(page, pageSize);
  const { userId } = await auth(); // گرفتن وضعیت لاگین
  return (
    <div className="space-y-6">
      {userId && (
        <Link href={'/orders/new'}>
          <Button className="flex items-center gap-2">
            <FaPlus size={16} />
            افزودن سفارش جدید
          </Button>
        </Link>
      )}

      <h1 className="text-xl font-bold">مدیریت سفارش‌ها</h1>
      <Suspense fallback={<OrderTableSkeleton rows={0} />}>
        <OrderTable orders={items} />
      </Suspense>
      <Pagination page={page} totalPages={totalPages} />
    </div>
  );
};
export const revalidate = 1800; // ISR: هر 30 دقیقه
export default OrdersPage;

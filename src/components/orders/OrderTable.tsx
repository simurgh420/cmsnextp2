import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { OrderActions } from './OrderActions';
import { OrderWithExtras } from '@/lib/types';

type OrderTableProps = {
  orders: OrderWithExtras[];
};

export default function OrderTable({ orders }: OrderTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>شناسه</TableHead>
          <TableHead>کاربر</TableHead>
          <TableHead>محصول</TableHead>
          <TableHead>تعداد</TableHead>
          <TableHead>وضعیت</TableHead>
          <TableHead>تاریخ</TableHead>
          <TableHead className="text-right">عملیات</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell className="font-mono text-xs text-gray-500">
              {order.id}
            </TableCell>
            <TableCell>{order.userName}</TableCell>
            <TableCell>{order.product.name}</TableCell>
            <TableCell>{order.quantity}</TableCell>
            <TableCell>
              <span
                className={`px-2 py-1 rounded text-xs font-medium ${
                  order.status === 'PENDING'
                    ? 'bg-yellow-100 text-yellow-800'
                    : order.status === 'PAID'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                }`}
              >
                {order.status}
              </span>
            </TableCell>
            <TableCell>
              {new Date(order.createdAt).toLocaleDateString('fa-IR')}
            </TableCell>
            <TableCell className="text-right">
              <OrderActions order={order} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

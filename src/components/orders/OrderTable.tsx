'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {    OrderActions } from './OrderActions';
import { Prisma } from '@prisma/client';
type OrderWithProduct = Prisma.OrderGetPayload<{
  include: { product: true };
}>;
type OrderTableProps = {
  orders: OrderWithProduct[];
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
          <TableHead className="text-right">عملیات</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell>{order.id}</TableCell>
            <TableCell>{order.userId}</TableCell>
            <TableCell>{order.product.name}</TableCell>
            <TableCell>{order.quantity}</TableCell>
            <TableCell>{order.status}</TableCell>
            <TableCell className="text-right">
              <OrderActions order={order} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

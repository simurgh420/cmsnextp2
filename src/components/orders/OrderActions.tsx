'use client';
import Link from 'next/link';
import { Button } from '@/components/ui';
import { Edit, Eye } from 'lucide-react';
import { DeleteOrderButton } from './DeleteOrderButton';
import { OrderWithProduct } from '@/lib/types';
export function OrderActions({ order }: { order: OrderWithProduct }) {
  return (
    <div className="flex gap-2">
      <Link href={`/orders/${order.id}`}>
        <Button variant="secondary" size="sm">
          <Eye className="h-4 w-4 mr-2" /> جزئیات
        </Button>
      </Link>
      <Link href={`/orders/edit/${order.id}`}>
        <Button variant="outline" size="sm">
          <Edit className="h-4 w-4 mr-2" /> ویرایش
        </Button>
      </Link>
      <DeleteOrderButton id={order.id} />
    </div>
  );
}

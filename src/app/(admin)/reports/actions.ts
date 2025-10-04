// app/(admin)/reports/actions.ts
'use server';

import { prisma } from '@/lib/prisma';
import { ReportsData } from '@/lib/types';

export async function getReportsData(): Promise<ReportsData> {
  const totalOrders = await prisma.order.count();
  const totalPaid = await prisma.order.count({ where: { status: 'PAID' } });
  const totalPending = await prisma.order.count({
    where: { status: 'PENDING' },
  });

  // گروه‌بندی سفارش‌ها بر اساس تاریخ (برای Line Chart)
  const ordersByDate = await prisma.order.groupBy({
    by: ['createdAt'],
    _count: { id: true },
    orderBy: { createdAt: 'asc' },
  });

  // گروه‌بندی بر اساس وضعیت (برای Pie Chart)
  const ordersByStatus = await prisma.order.groupBy({
    by: ['status'],
    _count: { id: true },
  });

  return {
    kpis: { totalOrders, totalPaid, totalPending },
    ordersByDate: ordersByDate.map((o) => ({
      date: o.createdAt.toISOString().split('T')[0],
      count: o._count.id,
    })),
    ordersByStatus: ordersByStatus.map((o) => ({
      status: o.status,
      count: o._count.id,
    })),
  };
}

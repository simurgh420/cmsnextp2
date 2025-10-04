'use server';

import { prisma } from '@/lib/prisma';
import { DashboardData } from '@/lib/types';

export async function getDashboardData(): Promise<DashboardData> {
  // Orders KPIs
  const totalOrders = await prisma.order.count();
  const totalPending = await prisma.order.count({
    where: { status: 'PENDING' },
  });
  const totalPaid = await prisma.order.count({ where: { status: 'PAID' } });
  const totalShipped = await prisma.order.count({
    where: { status: 'SHIPPED' },
  });
  const totalCancelled = await prisma.order.count({
    where: { status: 'CANCELLED' },
  });

  const ordersByDate = await prisma.order.groupBy({
    by: ['createdAt'],
    _count: { id: true },
    orderBy: { createdAt: 'asc' },
  });

  const ordersByStatus = await prisma.order.groupBy({
    by: ['status'],
    _count: { id: true },
  });

  // Products KPIs
  const totalProducts = await prisma.product.count();
  const activeProducts = await prisma.product.count({
    where: { status: 'ACTIVE' },
  });
  const inactiveProducts = await prisma.product.count({
    where: { status: 'INACTIVE' },
  });

  const productsByCategory = await prisma.product.groupBy({
    by: ['categoryId'],
    _count: { id: true },
  });

  // Top Products (بر اساس مجموع quantity در Order)
  const topProductsRaw = await prisma.order.groupBy({
    by: ['productId'],
    _sum: { quantity: true },
    orderBy: { _sum: { quantity: 'desc' } },
    take: 5,
  });

  const topProducts = await Promise.all(
    topProductsRaw.map(async (p) => {
      const product = await prisma.product.findUnique({
        where: { id: p.productId },
      });
      return {
        name: product?.name ?? 'نامشخص',
        sales: p._sum.quantity ?? 0,
      };
    }),
  );

  // Categories KPIs
  const totalCategories = await prisma.category.count();

  return {
    orders: {
      kpis: {
        totalOrders,
        totalPending,
        totalPaid,
        totalShipped,
        totalCancelled,
      },
      byDate: ordersByDate.map((o) => ({
        date: o.createdAt.toISOString().split('T')[0],
        count: o._count.id,
      })),
      byStatus: ordersByStatus.map((o) => ({
        status: o.status as 'PENDING' | 'PAID' | 'SHIPPED' | 'CANCELLED',
        count: o._count.id,
      })),
    },
    products: {
      kpis: { totalProducts, activeProducts, inactiveProducts },
      byCategory: productsByCategory.map((c) => ({
        category: c.categoryId ?? 'بدون دسته‌بندی',
        count: c._count.id,
      })),
      top: topProducts,
    },
    categories: {
      kpis: { totalCategories },
    },
  };
}

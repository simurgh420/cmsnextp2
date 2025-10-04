// types.ts
import { Prisma, Status, Product, Comment } from '@prisma/client';

export type ProductFormData = {
  name: string;
  price: number;
  status: Status;
  categoryId: string;
  image?: string | null;
};

export type CommentWithProduct = Comment & {
  product: Product;
};
export type UpdateCommentInput = {
  id: string;
  content?: string;
  productId?: string | null;
  userId?: string | null;
};
export type OrderWithProduct = Prisma.OrderGetPayload<{
  include: { product: true };
}>;
export type CommentWithExtras = Comment & {
  product?: Product | null;
  userName?: string; // 👈 اضافه شد
};
export type Role = 'admin' | 'user';
export type OrderWithExtras = OrderWithProduct & {
  userName: string;
};

export type Kpis = {
  totalOrders: number;
  totalPaid: number;
  totalPending: number;
};

// کل داده‌های گزارش
export type ReportsData = {
  kpis: Kpis;
  ordersByDate: OrdersByDate[];
  ordersByStatus: OrdersByStatus[];
};

// Orders
export type OrdersKpis = {
  totalOrders: number;
  totalPending: number;
  totalPaid: number;
  totalShipped: number;
  totalCancelled: number;
};

export type OrdersByDate = {
  date: string;
  count: number;
};

export type OrdersByStatus = {
  status: 'PENDING' | 'PAID' | 'SHIPPED' | 'CANCELLED';
  count: number;
};

// Products
export type ProductsKpis = {
  totalProducts: number;
  activeProducts: number;
  inactiveProducts: number;
};

export type ProductsByCategory = {
  category: string;
  count: number;
};

export type TopProduct = {
  name: string;
  sales: number;
};

// Categories
export type CategoriesKpis = {
  totalCategories: number;
};

// DashboardData
export type DashboardData = {
  orders: {
    kpis: OrdersKpis;
    byDate: OrdersByDate[];
    byStatus: OrdersByStatus[];
  };
  products: {
    kpis: ProductsKpis;
    byCategory: ProductsByCategory[];
    top: TopProduct[];
  };
  categories: {
    kpis: CategoriesKpis;
  };
};

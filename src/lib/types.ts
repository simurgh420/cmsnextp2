// types.ts
import { Prisma, Status, Product, Comment } from '@prisma/client';
import { OrderSchema } from './validations/order';
import { ProductSchema } from './validations/product';
import { CommentSchema } from './validations/comment';
// Product types and props:
export type ProductFormData = {
  name: string;
  price: number;
  status: Status;
  categoryId: string;
  image?: string | null;
};

export type ProductFormProps = {
  initialData?: Partial<Product>; // برای ویرایش
  onSubmit: (data: ProductSchema) => Promise<void> | Promise<Product>;
  categories: Category[];
};
// Category type
export type Category = {
  id: string;
  name: string;
  slug: string;
};
// Comment types and props
export type CommentWithProduct = Comment & {
  product: Product;
};
export type CommentFormProps = {
  products: { id: string; name: string }[];
  users?: { id: string; name: string }[];
  initialData?: Partial<CommentSchema>;
  action: (data: CommentSchema) => Promise<void>;
};
export type UpdateCommentInput = {
  id: string;
  content?: string;
  productId?: string | null;
  userId?: string | null;
};
export type CommentWithExtras = Comment & {
  product?: Product | null;
  userName?: string; // 👈 اضافه شد
};
// Order types and props
export type OrderWithProduct = Prisma.OrderGetPayload<{
  include: { product: true };
}>;

export type Role = 'admin' | 'user';
export type OrderWithExtras = OrderWithProduct & {
  userName: string;
};

type ProductOption = { id: string; name: string; price: number };
export type OrdersProps = {
  products: ProductOption[];
  defaultValues?: Partial<OrderSchema>;
  action?: (formData: FormData) => Promise<void>;
  isEdit?: boolean;
  orderId?: string;
};

// گزارش‌ها و داشبورد
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

// Products report
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

// Categories report
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
// notif types
export type NotificationType = 'success' | 'error' | 'info' | 'warning';
export type NotifyArgs = {
  title?: string;
  message: string;
  type?: NotificationType;
  duration?: number; // 👈 مدت زمان نمایش toast
};
//PWA types
 export type PWAOptions = {
    dest?: string;
    disable?: boolean;
    register?: boolean;
    skipWaiting?: boolean;
    [key: string]: any;
  };

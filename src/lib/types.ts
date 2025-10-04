// types.ts
import { Prisma, Status, Order, Product, Comment } from '@prisma/client';

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


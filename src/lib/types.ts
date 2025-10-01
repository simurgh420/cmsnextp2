// types.ts
import { Status } from '@prisma/client';
import { Comment, Product } from '@prisma/client';

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


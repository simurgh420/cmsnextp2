// types.ts
import { Status } from '@prisma/client';

export type ProductFormData = {
  name: string;
  price: number;
  status: Status;
  image?: string | null;
};

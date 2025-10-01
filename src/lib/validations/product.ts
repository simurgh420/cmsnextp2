import { z } from 'zod';
import { Status } from '@prisma/client';

export const productSchema = z.object({
  name: z.string().min(2, 'نام محصول الزامی است'),
  price: z.number().min(1000, 'قیمت باید بیشتر از 1000 باشد'),
  status: z.nativeEnum(Status),
  image: z.string().url('لینک عکس معتبر نیست').nullable().optional(),
  categoryId: z.string().min(1, 'انتخاب دسته‌بندی الزامی است'),
});
export type ProductSchema = z.infer<typeof productSchema>;

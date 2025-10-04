import { z } from 'zod';
import { OrderStatus } from '@prisma/client';

export const orderSchema = z.object({
  productId: z.string().min(1, { message: 'شناسه محصول الزامی است' }),
  quantity: z.coerce
    .number()
    .min(1, { message: 'حداقل یک عدد سفارش لازم است' }),
  status: z.nativeEnum(OrderStatus).default(OrderStatus.PENDING),
});
export type OrderSchema = z.output<typeof orderSchema>; // داده‌ی نهایی (بعد از پارس)
export type OrderSchemaInput = z.input<typeof orderSchema>; // داده‌ی خام (فرم)

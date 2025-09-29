import { z } from 'zod';

export const categorySchema = z.object({
  name: z.string().min(1, 'نام دسته‌بندی الزامی است'),
  slug: z
    .string()
    .min(1, 'اسلاگ الزامی است')
    .regex(/^[a-z0-9-]+$/, 'فقط حروف کوچک، عدد و خط تیره مجاز است'),
});
export type CategorySchema = z.infer<typeof categorySchema>;

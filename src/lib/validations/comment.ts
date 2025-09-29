// lib/validations/comment.ts
import { z } from 'zod';
import { CommentStatus } from '@prisma/client';

export const commentSchema = z.object({
  content: z.string().min(2, 'متن کامنت الزامی است'),
  userId: z.string().nullable().optional(),
  productId: z.string().min(1, 'انتخاب محصول الزامی است'),
});

export type CommentSchema = z.infer<typeof commentSchema>;
// ✅ برای آپدیت (ویرایش متن یا تغییر وضعیت)
export const updateCommentSchema = z.object({
  content: z.string().min(2, 'متن کامنت الزامی است').optional(),
  status: z.nativeEnum(CommentStatus).optional(),
});
export type UpdateCommentSchema = z.infer<typeof updateCommentSchema>;

// ✅ برای تغییر وضعیت سریع (approve/reject)
export const commentActionSchema = z.object({
  action: z.enum(['approve', 'reject', 'delete']),
});
export type CommentActionSchema = z.infer<typeof commentActionSchema>;

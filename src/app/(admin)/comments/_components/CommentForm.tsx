'use client';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui';
import { Button } from '@/components/ui';
import { Textarea } from '@/components/ui';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui';
import { commentSchema, CommentSchema } from '@/lib/validations/comment';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui';
import { CommentFormProps } from '@/lib/types';

export default function CommentForm({
  products,
  initialData,
  onSubmit,
}: CommentFormProps) {
  const form = useForm<Omit<CommentSchema, 'userId'>>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      content: initialData?.content ?? '',
      productId: initialData?.productId ?? '',
    },
  });
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 max-w-lg"
      >
        {/* متن کامنت */}
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>متن کامنت</FormLabel>
              <FormControl>
                <Textarea placeholder="نظر خود را وارد کنید..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* انتخاب محصول */}
        <FormField
          control={form.control}
          name="productId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نتخاب محصول </FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="انتخاب محصول" />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map((p) => (
                      <SelectItem key={p.id} value={p.id}>
                        {p.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'در حال ذخیره...' : 'ذخیره'}
        </Button>
      </form>
    </Form>
  );
}

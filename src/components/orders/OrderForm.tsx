'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { orderSchema, OrderSchemaInput } from '@/lib/validations/order';
import { Button } from '@/components/ui';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui';
import { Input } from '@/components/ui';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { toast } from 'sonner';
import { useTransition } from 'react';
import { OrdersProps } from '@/lib/types';
import { useNotify } from '@/lib/notify';
export default function OrderForm({
  products,
  defaultValues,
  action,
  isEdit = false,
  orderId,
}: OrdersProps) {
  const [isPending, startTransition] = useTransition();
  const notify = useNotify();
  const form = useForm<OrderSchemaInput>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      productId: defaultValues?.productId ?? '',
      quantity: defaultValues?.quantity ?? 1,
      status: defaultValues?.status ?? 'PENDING',
    },
  });

  const onSubmit: SubmitHandler<OrderSchemaInput> = (data) => {
    if (!action) return;

    const formData = new FormData();
    formData.append('productId', data.productId);
    formData.append('quantity', String(data.quantity));
    formData.append('status', data.status || 'PENDING');

    if (isEdit && orderId) {
      formData.append('orderId', orderId);
    }

    startTransition(async () => {
      try {
        await action(formData);
        notify({
          title: 'موفقیت',
          message: isEdit
            ? '✅سفارش با موفقیت به‌روزرسانی شد'
            : '✅سفارش با موفقیت ثبت شد',
          type: 'success',
          duration: 5000,
        });
        if (!isEdit) {
          form.reset();
        }
      } catch (error: any) {
        notify({
          title: 'خطا',
          message:
            error?.message ||
            (isEdit ? '❌خطا در به‌روزرسانی سفارش' : '❌خطا در ثبت سفارش'),
          type: 'error',
          duration: Infinity,
        });
      }
    });
  };

  const selectedProduct = products.find(
    (p) => p.id === form.watch('productId'),
  );
  const quantity = Number(form.watch('quantity')) || 0;
  const totalPrice = selectedProduct ? selectedProduct.price * quantity : 0;

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>{isEdit ? 'ویرایش سفارش' : 'ایجاد سفارش جدید'}</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
              autoComplete="off"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="productId"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>محصول *</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                        disabled={isPending}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="انتخاب محصول" />
                        </SelectTrigger>
                        <SelectContent>
                          {products.map((p) => (
                            <SelectItem key={p.id} value={p.id}>
                              <div className="flex justify-between items-center w-full">
                                <span>{p.name}</span>
                                <span className="text-sm text-muted-foreground mr-2">
                                  {p.price.toLocaleString('fa-IR')} تومان
                                </span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>تعداد *</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={1}
                          value={field.value ? String(field.value) : ''}
                          disabled={isPending}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                          onBlur={field.onBlur}
                          name={field.name}
                          ref={field.ref}
                          placeholder="1"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>وضعیت سفارش *</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                        disabled={isPending}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="انتخاب وضعیت" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="PENDING">در انتظار</SelectItem>
                          <SelectItem value="PAID">پرداخت‌شده</SelectItem>
                          <SelectItem value="CANCELLED">لغوشده</SelectItem>
                          <SelectItem value="SHIPPED">ارسال‌شده</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {selectedProduct && (
                <Card className="bg-muted/50">
                  <CardContent className="pt-6">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">
                          محصول انتخاب شده:
                        </span>
                        <span className="text-sm">{selectedProduct.name}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">قیمت واحد:</span>
                        <span className="text-sm">
                          {selectedProduct.price.toLocaleString('fa-IR')} تومان
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">تعداد:</span>
                        <span className="text-sm">{String(quantity)}</span>
                      </div>
                      <div className="flex justify-between items-center border-t pt-2">
                        <span className="font-semibold">مجموع:</span>
                        <span className="font-semibold text-lg">
                          {totalPrice.toLocaleString('fa-IR')} تومان
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="flex gap-4 pt-4">
                <Button type="submit" disabled={isPending} className="flex-1">
                  {isPending
                    ? isEdit
                      ? 'در حال به‌روزرسانی...'
                      : 'در حال ثبت...'
                    : isEdit
                      ? 'به‌روزرسانی سفارش'
                      : 'ثبت سفارش'}
                </Button>
                {isEdit && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => form.reset()}
                    disabled={isPending}
                  >
                    بازنشانی
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

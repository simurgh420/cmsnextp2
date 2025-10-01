'use client';

import { useRouter } from 'next/navigation';
import { Product } from '@prisma/client';
import { ProductFormData } from '@/lib/types';
import { ProductForm } from '@/components/products/ProductForm';
import { toast } from 'sonner';

interface Props {
  product: Product;
}

export default function EditProductClient({ product }: Props) {
  const router = useRouter();

  const handleSubmit = async (data: ProductFormData) => {
    try {
      const res = await fetch(`/api/products/${product.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || res.statusText);
      }

      toast.success('محصول با موفقیت ویرایش شد');
      router.push('/products');
    } catch (error) {
      console.error('Update failed:', error);
      toast.error('خطا در ویرایش محصول');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">ویرایش محصول</h1>
        <p className="text-gray-600 mt-1">
          ویرایش اطلاعات محصول: {product.name}
        </p>
      </div>

      <ProductForm initialData={product} onSubmit={handleSubmit} />
    </div>
  );
}

'use client';

import { useRouter } from 'next/navigation';
import { Product } from '@prisma/client';
import { ProductFormData } from '@/lib/types';
import { ProductForm } from '@/components/products/ProductForm';

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

      if (res.ok) {
        router.push('/products');
        router.refresh();
      } else {
        const errorData = await res.json().catch(() => ({}));
        console.error('Update failed:', errorData.error || res.statusText);
      }
    } catch (error) {
      console.error('Network or server error:', error);
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

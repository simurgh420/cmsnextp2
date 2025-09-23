'use client';

import { FC } from 'react';
import { Button } from '@/components/ui/button';
import { FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ProductForm } from '@/components/products/ProductForm';
import { ProductFormData } from '@/lib/types';

const NewProductPage: FC = () => {
  const router = useRouter();
  const handleSubmit = async (data: ProductFormData) => {
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      router.push('/products');
      router.refresh();
    } else {
      alert('خطا در ثبت محصول');
    }
  };

  return (
    <div className="space-y-6">
      {/* هدر صفحه */}
      <div className="flex items-center gap-4">
        <Link href="/products">
          <Button variant="outline" className="flex items-center gap-2">
            <FaArrowRight size={16} />
            بازگشت به لیست محصولات
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            افزودن محصول جدید
          </h1>
          <p className="text-gray-600 mt-1">اطلاعات محصول جدید را وارد کنید</p>
        </div>
      </div>

      {/* فرم افزودن محصول */}
      <ProductForm onSubmit={handleSubmit} />
    </div>
  );
};

export default NewProductPage;

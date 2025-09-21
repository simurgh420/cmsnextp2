'use client';

import { FC } from 'react';
import { Button } from '@/components/ui/button';
import { FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';
import { ProductForm } from '@/components/products/ProductForm';
import { Product } from '@/application/products/products.types';

const NewProductPage: FC = () => {
  const handleSubmit = (data: Omit<Product, 'id'>) => {
    console.log('محصول جدید:', data);
    // اینجا بعداً به API وصل می‌کنیم
    // بعد از ذخیره موفق، به لیست محصولات برگردیم
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

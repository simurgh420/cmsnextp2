'use client';

import { FC } from 'react';
import { useParams } from 'next/navigation';
import { ProductForm } from '@/components/products/ProductForm';
import { mockProducts } from '@/application/products/products.mock';
import { Product } from '@/application/products/products.types';

const EditProductPage: FC = () => {
  const params = useParams();
  const productId = params.id as string;

  // پیدا کردن محصول برای ویرایش
  const product = mockProducts.find((p) => p.id === productId);

  const handleSubmit = (data: Omit<Product, 'id'>) => {
    console.log('ویرایش محصول:', { id: productId, ...data });
    // اینجا بعداً به API وصل می‌کنیم
  };

  if (!product) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">محصول یافت نشد</h1>
          <p className="text-gray-600 mt-1">
            محصول با شناسه {productId} وجود ندارد
          </p>
        </div>
      </div>
    );
  }

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
};

export default EditProductPage;

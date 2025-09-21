'use client';

import { FC } from 'react';
import { Product } from '@/application/products/products.types';
import { ProductRow } from './ProductRow';

type Props = {
  products: Product[];
};

export const ProductsTable: FC<Props> = ({ products }) => {
  return (
    <table className="w-full border-collapse bg-white shadow-sm rounded">
      <thead>
        <tr className="bg-gray-100 text-right text-sm font-medium text-gray-700">
          <th className="p-3">نام محصول</th>
          <th className="p-3">قیمت</th>
          <th className="p-3">وضعیت</th>
          <th className="p-3">عملیات</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <ProductRow key={product.id} product={product} />
        ))}
      </tbody>
    </table>
  );
};

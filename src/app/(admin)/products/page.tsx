import { FC, Suspense } from 'react';
import { ProductsTable } from '@/components/products/ProductsTable';
import { Button } from '@/components/ui/button';
import { FaPlus } from 'react-icons/fa';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { Status } from '@prisma/client';
import { ProductTableSkeleton } from '@/components/products/product-table-skeleton';
const ProductsPage = async () => {
  const products = await prisma.product.findMany();

  return (
    <div className="space-y-6">
      {/* هدر صفحه */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">مدیریت محصولات</h1>
          <p className="text-gray-600 mt-1">لیست تمام محصولات موجود در سیستم</p>
        </div>
        <Link href="/products/new">
          <Button className="flex items-center gap-2">
            <FaPlus size={16} />
            افزودن محصول جدید
          </Button>
        </Link>
      </div>

      {/* آمار کلی */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-sm text-gray-600">کل محصولات</div>
          <div className="text-2xl font-bold text-gray-900">
            {products.length}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-sm text-gray-600">محصولات فعال</div>
          <div className="text-2xl font-bold text-green-600">
            {products.filter((p) => p.status === Status.ACTIVE).length}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-sm text-gray-600">محصولات غیرفعال</div>
          <div className="text-2xl font-bold text-red-600">
            {products.filter((p) => p.status === Status.INACTIVE).length}
          </div>
        </div>
      </div>

      {/* جدول محصولات */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">لیست محصولات</h2>
        </div>
        <div className="overflow-x-auto">
          <Suspense fallback={<ProductTableSkeleton rows={8} />}>
            <ProductsTable products={products} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;

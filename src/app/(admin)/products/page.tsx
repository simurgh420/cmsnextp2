import { Suspense } from 'react';
import { ProductsTable } from '@/components/products/ProductsTable';
import { Button } from '@/components/ui';
import { FaPlus } from 'react-icons/fa';
import Link from 'next/link';
import { Status } from '@prisma/client';
import { ProductTableSkeleton } from '@/components/products/product-table-skeleton';
import { getProducts } from './actions';
import { Pagination } from '@/components/Pagination';
const ProductsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; pageSize?: string }>;
}) => {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const pageSize = Number(params.pageSize) || 5;
  const { items, totalPages } = await getProducts(page, pageSize);
  return (
    <div className="space-y-6">
      {/* هدر صفحه */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">مدیریت محصولات</h1>
          <p className="text-muted-foreground mt-1">
            لیست تمام محصولات موجود در سیستم
          </p>
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
        <div className="bg-card p-4 rounded-lg shadow-sm border">
          <div className="text-sm text-muted-foreground">کل محصولات</div>
          <div className="text-2xl font-bold text-foreground">
            {items.length}
          </div>
        </div>
        <div className="bg-card p-4 rounded-lg shadow-sm border">
          <div className="text-sm text-muted-foreground">محصولات فعال</div>
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {items.filter((p) => p.status === Status.ACTIVE).length}
          </div>
        </div>
        <div className="bg-card p-4 rounded-lg shadow-sm border">
          <div className="text-sm text-muted-foreground">محصولات غیرفعال</div>
          <div className="text-2xl font-bold text-red-600 dark:text-red-400">
            {items.filter((p) => p.status === Status.INACTIVE).length}
          </div>
        </div>
      </div>

      {/* جدول محصولات */}
      <div className="bg-card rounded-lg shadow-sm border overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold text-foreground">
            لیست محصولات
          </h2>
        </div>
        <div className="overflow-x-auto">
          <Suspense fallback={<ProductTableSkeleton rows={8} />}>
            <ProductsTable products={items} />
          </Suspense>
          <Pagination page={page} totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
};
export default ProductsPage;
export const revalidate = 3600; // ISR: هر 1 ساعت rebuild

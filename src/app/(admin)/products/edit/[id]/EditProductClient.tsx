'use client';

import { useRouter } from 'next/navigation';
import { Product, Category } from '@prisma/client';
import { ProductFormData } from '@/lib/types';
import { ProductForm } from '@/components/products/ProductForm';
import { updateProduct } from '../../actions';
import { useNotify } from '@/lib/notify';

interface Props {
  product: Product;
  categories: Category[];
}

export default function EditProductClient({ product, categories }: Props) {
  const router = useRouter();
  const notify = useNotify();

  const handleSubmit = async (data: ProductFormData) => {
    try {
      await updateProduct(product.id, data);
      notify({
        title: 'موفقیت',
        message: `نحصول «${product.name}» با موفقیت ویرایش شد`,
        type: 'success',
        duration: 5000,
      });
      router.push('/products');
    } catch (error) {
      console.error('Update failed:', error);
      notify({
        title: 'خطا',
        message: '❌خطا در ویرایش محصول',
        type: 'error',
        duration: Infinity,
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">ویرایش محصول</h1>
        <p className="text-muted-foreground mt-1">
          ویرایش اطلاعات محصول: {product.name}
        </p>
      </div>

      <ProductForm
        initialData={product}
        categories={categories}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

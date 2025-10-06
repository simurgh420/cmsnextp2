import { Button } from '@/components/ui';
import { FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';
import { ProductForm } from '@/components/products/ProductForm';
import { createProduct } from '../actions';
import { getCategories } from '../../categories/actions';
const NewProductPage = async () => {
  // گرفتن وضعیت کاربر

  const categories = await getCategories();

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
          <h1 className="text-2xl font-bold">افزودن محصول جدید</h1>
          <p className="text-muted-foreground mt-1">
            اطلاعات محصول جدید را وارد کنید
          </p>
        </div>
      </div>

      {/* فرم افزودن محصول */}
      <ProductForm onSubmit={createProduct} categories={categories} />
    </div>
  );
};

export default NewProductPage;

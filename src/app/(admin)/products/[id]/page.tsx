import { prisma } from '@/lib/prisma';
import EditProductClient from '../edit/[id]/page';

export default async function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">محصول یافت نشد</h1>
        <p className="text-gray-600 mt-1">
          محصول با شناسه {params.id} وجود ندارد
        </p>
      </div>
    );
  }

  return <EditProductClient product={product} />;
}

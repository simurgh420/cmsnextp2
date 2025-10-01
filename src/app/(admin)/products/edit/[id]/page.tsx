import { notFound } from 'next/navigation';
import EditProductClient from './EditProductClient';
import { getProduct } from '../../actions';
import { getCategories } from '@/app/(admin)/categories/actions';

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  if (!resolvedParams.id) {
    return notFound();
  }
  const { id } = resolvedParams;
  const product = await getProduct(id);
  const categories = await getCategories();

  if (!product) return notFound();
  return <EditProductClient product={product} categories={categories} />;
}

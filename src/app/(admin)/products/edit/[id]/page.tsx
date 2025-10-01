import { notFound } from 'next/navigation';
import EditProductClient from './EditProductClient';
import { getProduct } from '../../actions';

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

  if (!product) return notFound();
  return <EditProductClient product={product} />;
}

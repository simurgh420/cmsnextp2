import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import EditProductClient from './EditProductClient';

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) return notFound();
  return <EditProductClient product={product} />;
}

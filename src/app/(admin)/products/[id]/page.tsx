import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Edit } from 'lucide-react';
import { Button } from '@/components/ui';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui';
import { Badge } from '@/components/ui';
import DeleteProductButton from './DeleteProductButton';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: Props) {
  const resolvedParams = await params;
  if (!resolvedParams.id) {
    return notFound();
  }
  const { id } = resolvedParams;
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      category: true,
    },
  });
  if (!product) return notFound();
  const statusColor =
    product.status === 'ACTIVE'
      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      : 'bg-muted text-muted-foreground';
  return (
    <div>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 space-x-reverse">
            <Link
              href="/admin/products"
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <h1 className="text-2xl font-bold text-foreground">جزئیات محصول</h1>
          </div>
          <div className="flex space-x-2 space-x-reverse">
            <Link href={`/products/edit/${id}`}>
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                ویرایش
              </Button>
            </Link>
            <DeleteProductButton id={id} name={product.name} />
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{product.name}</CardTitle>
            <CardDescription>اطلاعات کامل محصول</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {product.image && (
              <div className="flex justify-center">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={300}
                  height={200}
                  className="rounded-lg object-cover"
                />
              </div>
            )}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">قیمت:</p>
                <p className="font-semibold">
                  {product.price.toLocaleString('fa-IR')} تومان
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">دسته‌بندی:</p>
                <p className="font-semibold">{product.category?.name || '—'}</p>
              </div>
              <div>
                <p className="text-muted-foreground">وضعیت:</p>
                <Badge className={statusColor}>{product.status}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

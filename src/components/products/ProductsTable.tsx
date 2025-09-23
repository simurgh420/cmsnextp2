'use client';

import { ProductRow } from './ProductRow';
import {
  Table,
  TableBody,
  TableHeader,
  TableHead,
  TableRow,
} from '@/components/ui/table';
import { Product } from '@prisma/client';
type ProductsTableProps = {
  products: Product[];
};

export const ProductsTable = ({ products }: ProductsTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-right">عکس</TableHead>
          <TableHead className="text-right">نام محصول</TableHead>
          <TableHead className="text-right">قیمت</TableHead>
          <TableHead className="text-right">وضعیت</TableHead>
          <TableHead className="text-right">عملیات</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <ProductRow key={product.id} product={product} />
        ))}
      </TableBody>
    </Table>
  );
};

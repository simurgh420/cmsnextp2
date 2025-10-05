import { ProductRow } from './ProductRow';
import {
  Table,
  TableBody,
  TableHeader,
  TableHead,
  TableRow,
} from '@/components/ui';
import { Product } from '@prisma/client';

export const ProductsTable = ({ products }: { products: Product[] }) => {
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

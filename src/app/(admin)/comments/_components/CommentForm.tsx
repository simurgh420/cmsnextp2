'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type CommentFormProps = {
  products: { id: string; name: string }[];
  users?: { id: string; name: string }[];
  initialData?: {
    content: string;
    userId: string;
    productId: string;
  };
  onSubmit: (data: {
    content: string;
    userId: string;
    productId: string;
  }) => Promise<void>;
};
export default function CommentForm({
  products,
  users = [],
  initialData,
  onSubmit,
}: CommentFormProps) {
  const [content, setContent] = useState(initialData?.content || '');
  const [userId, setUserId] = useState(initialData?.userId || '');
  const [productId, setProductId] = useState(initialData?.productId || '');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await onSubmit({ content, userId, productId });
    setLoading(false);
  }
  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
      <Textarea
        placeholder="متن کامنت"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Select value={productId} onValueChange={setProductId}>
        <SelectTrigger>
          <SelectValue placeholder="انتخاب محصول" />
        </SelectTrigger>
        <SelectContent>
          {products.map((p) => (
            <SelectItem key={p.id} value={p.id}>
              {p.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {users.length > 0 && (
        <Select value={userId} onValueChange={setUserId}>
          <SelectTrigger>
            <SelectValue placeholder="انتخاب کاربر" />
          </SelectTrigger>
          <SelectContent>
            {users.map((u) => (
              <SelectItem key={u.id} value={u.id}>
                {u.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
      <Button type="submit" disabled={loading}>
        {loading ? 'در حال ذخیره...' : 'ذخیره'}
      </Button>
    </form>
  );
}

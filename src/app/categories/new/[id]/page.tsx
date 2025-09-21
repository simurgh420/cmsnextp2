'use client';

import { FC } from 'react';
import { useParams } from 'next/navigation';

const EditCategoryPage: FC = () => {
  const params = useParams();
  const categoryId = params.id as string;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">ویرایش دسته‌بندی</h1>
        <p className="text-gray-600 mt-1">شناسه دسته‌بندی: {categoryId}</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <p className="text-gray-500">
          صفحه ویرایش دسته‌بندی در حال توسعه است...
        </p>
      </div>
    </div>
  );
};

export default EditCategoryPage;

'use client';

import { FC } from 'react';

const NewCategoryPage: FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          افزودن دسته‌بندی جدید
        </h1>
        <p className="text-gray-600 mt-1">
          اطلاعات دسته‌بندی جدید را وارد کنید
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <p className="text-gray-500">
          صفحه افزودن دسته‌بندی در حال توسعه است...
        </p>
      </div>
    </div>
  );
};

export default NewCategoryPage;

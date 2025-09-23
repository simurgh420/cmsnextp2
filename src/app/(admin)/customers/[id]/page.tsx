'use client';

import { FC } from 'react';
import { useParams } from 'next/navigation';

const CustomerDetailPage: FC = () => {
  const params = useParams();
  const customerId = params.id as string;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">جزئیات مشتری</h1>
        <p className="text-gray-600 mt-1">شناسه مشتری: {customerId}</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <p className="text-gray-500">صفحه جزئیات مشتری در حال توسعه است...</p>
      </div>
    </div>
  );
};

export default CustomerDetailPage;

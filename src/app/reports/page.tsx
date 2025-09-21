'use client';

import { FC } from 'react';

const ReportsPage: FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">گزارش‌ها</h1>
        <p className="text-gray-600 mt-1">گزارش‌های مختلف سیستم</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <p className="text-gray-500">صفحه گزارش‌ها در حال توسعه است...</p>
      </div>
    </div>
  );
};

export default ReportsPage;

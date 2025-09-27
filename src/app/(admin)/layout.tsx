import React from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="bg-gray-50 antialiased min-h-screen">{children}</div>;
}

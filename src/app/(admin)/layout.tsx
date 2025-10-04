import React from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-background antialiased min-h-screen transition-colors duration-300">
      {children}
    </div>
  );
}

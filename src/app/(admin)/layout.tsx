import { FC, ReactNode } from 'react';
type Props = {
  children: ReactNode;
};

export default function AdminLayout({ children }: Props) {
  return (
    <div className="bg-gray-50 antialiased">
      <body>{children}</body>
    </div>
  );
}

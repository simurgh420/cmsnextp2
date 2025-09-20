'use client';
import { FC } from 'react';
import { MdMenu } from 'react-icons/md';

type Props = {
  onClick: () => void;
};

export const SidebarToggle: FC<Props> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="p-2 text-white bg-gray-900 rounded-md md:hidden"
    >
      <MdMenu size={24} />
    </button>
  );
};

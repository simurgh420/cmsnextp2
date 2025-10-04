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
      className="p-2 text-sidebar-foreground bg-sidebar rounded-md md:hidden transition-colors duration-300"
    >
      <MdMenu size={24} />
    </button>
  );
};

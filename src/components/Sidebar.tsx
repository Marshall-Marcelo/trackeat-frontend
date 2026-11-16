import React from 'react';
import { Link } from '@tanstack/react-router';
import { cn } from '@/lib/utils/cn';
import { Home, NotebookText, Plus } from 'lucide-react';

interface SidebarProps {
  className?: string;
  currentlySelected: string;
  isHidden?: boolean;
}

interface SidebarItemProps {
  children: React.ReactNode;
  onClick?: React.Dispatch<React.SetStateAction<string>>;
  exclude?: boolean;
  itemPath?: string;
  currentlySelected?: string;
  className?: string;
}

const sidebarContent = [
  { name: 'dashboard', icon: <Home />, path: '/app' },
  { name: 'tracker', icon: <NotebookText />, path: '/app/tracker' },
  { name: 'meal-input', icon: <Plus />, path: '/app/new-meal' },
];

const Sidebar = ({ className, currentlySelected, isHidden }: SidebarProps) => {
  return (
    <div
      className={cn(
        ' flex flex-col gap-1 shadow-2xl rounded-md items-center',
        isHidden ? 'hidden' : '',
        className,
      )}
    >
      {sidebarContent.map((item, i) => {
        return (
          <Link key={item.name + i} to={item.path}>
            <SidebarItem
              itemPath={item.path}
              exclude={false}
              currentlySelected={currentlySelected}
            >
              {item.icon}
            </SidebarItem>
          </Link>
        );
      })}
    </div>
  );
};

const SidebarItem = ({
  children,
  className,
  itemPath,
  currentlySelected,
  exclude,
}: SidebarItemProps) => {
  return (
    <div
      className={cn(
        'hover:cursor-pointer p-4 rounded-md transition duration-200',
        itemPath === currentlySelected && !exclude
          ? 'bg-gray-500 text-gray-100'
          : 'text-black',
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Sidebar;

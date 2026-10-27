import React from 'react';
import { Link } from '@tanstack/react-router';
import { cn } from '@/lib/utils/cn';
import {
  Home,
  Settings,
  NotebookText,
  LogOut,
  ChevronsLeft,
} from 'lucide-react';

interface SidebarProps {
  className?: string;
  currentlySelected: string;
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
  { name: 'dashboard', icon: <Settings />, path: '/app/settings' },
];

const Sidebar = ({ className, currentlySelected }: SidebarProps) => {
  return (
    <div
      className={cn(
        ' flex flex-col gap-1 shadow-2xl rounded-md items-center',
        className,
      )}
    >
      <SidebarItem exclude={true}>
        <ChevronsLeft />
      </SidebarItem>

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

      <SidebarItem className="mt-auto" exclude={true}>
        <LogOut color="red" />
      </SidebarItem>
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

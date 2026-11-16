import Sidebar from '@/components/Sidebar';
import { useCurrentRoute } from '@/hooks/useCurrentRoute';
import { useAuth } from '@/hooks/useAuth';
import { Menu, LogOut } from 'lucide-react';
import { useState } from 'react';

type Props = {
  children: React.ReactNode;
};

const MobileLayout = ({ children }: Props) => {
  const currentPath = useCurrentRoute();
  const auth = useAuth();

  const [isHidden, setIsHidden] = useState(false);

  return (
    <>
      <div className="px-4 py-2 mb-1 shadow flex justify-between items-center">
        <Menu onClick={() => setIsHidden((prev) => !prev)} />
        <div className="flex gap-1 items-center">
          <span>{auth.user?.username}</span>
          <LogOut size={18} color="red" />
        </div>
      </div>
      <div className="p-2 flex gap-2 h-dvh">
        <Sidebar currentlySelected={currentPath} isHidden={isHidden} />
        <main className="w-full p-2 h-dvh overflow-y-auto relative bg-white">
          {children}
        </main>
      </div>
    </>
  );
};

export default MobileLayout;

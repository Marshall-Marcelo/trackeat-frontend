type Props = {
  children: React.ReactNode;
};

import Sidebar from '@/components/Sidebar';
import { useRouterState } from '@tanstack/react-router';

const MobileLayout = ({ children }: Props) => {
  const currentPath = useRouterState({
    select: (state) => state.location.pathname,
  });

  return (
    <div className="p-2 flex gap-4 h-dvh">
      <Sidebar currentlySelected={currentPath} />
      <div>{children}</div>
    </div>
  );
};

export default MobileLayout;

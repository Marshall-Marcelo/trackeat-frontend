import Sidebar from '@/components/Sidebar';
import { useCurrentRoute } from '@/hooks/useCurrentRoute';

type Props = {
  children: React.ReactNode;
};

const MobileLayout = ({ children }: Props) => {
  const currentPath = useCurrentRoute();

  return (
    <div className="p-2 flex gap-2 h-dvh ">
      <Sidebar currentlySelected={currentPath} />
      <div className="w-full p-2 h-dvh overflow-y-auto relative">
        {children}
      </div>
    </div>
  );
};

export default MobileLayout;

type Props = {
  children: React.ReactNode;
};

import Sidebar from '@/components/Sidebar';

const DesktopLayout = ({ children }: Props) => {
  return (
    <div className="flex h-dvh">
      <Sidebar />
      <div className="w-full"> {children}</div>
    </div>
  );
};

export default DesktopLayout;

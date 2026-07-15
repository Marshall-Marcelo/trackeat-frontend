import DesktopLayout from './DesktopLayout';
import MobileLayout from './MobileLayout';
import { useIsMobile } from '../hooks/useIsMobile';

type Props = {
  children: React.ReactNode;
};

const ResponsiveLayout = ({children}: Props) => {
  const isMobile = useIsMobile();

  return isMobile ? <MobileLayout>{children}</MobileLayout> : <DesktopLayout>{children}</DesktopLayout>;
};

export default ResponsiveLayout;

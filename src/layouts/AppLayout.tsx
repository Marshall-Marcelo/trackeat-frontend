import Sidebar from '@/components/Sidebar';
import { useCurrentRoute } from '@/hooks/useCurrentRoute';
import { useAuth } from '@/hooks/useAuth';
import { Menu, LogOut } from 'lucide-react';
import { useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useLogoutAccount } from '@/hooks/useLogout';
import Loader from '@/components/Loader';

type Props = {
  children: React.ReactNode;
};

const AppLayout = ({ children }: Props) => {
  const auth = useAuth();
  const currentPath = useCurrentRoute();

  const [isHidden, setIsHidden] = useState(false);
  const { mutate: logout, isPending: isLoggingOut } = useLogoutAccount();

  return (
    <>
      <div className="px-4 py-2 mb-1 shadow flex justify-between items-center">
        <Menu onClick={() => setIsHidden((prev) => !prev)} />
        <div className="flex gap-1 items-center">
          <span>{auth.user?.username}</span>
          <Dialog>
            <DialogTrigger render={<LogOut size={18} color="red" />} />
            <DialogContent className="bg-white">
              <DialogHeader>
                <DialogTitle className="text-lg font-bold text-red-600">
                  Logout
                </DialogTitle>
                <DialogDescription>Do you want to proceed?</DialogDescription>
              </DialogHeader>
              <DialogFooter className="flex flex-row justify-end">
                <DialogClose
                  render={
                    <Button
                      className="font-medium"
                      disabled={isLoggingOut}
                      variant="outline"
                    >
                      Cancel
                    </Button>
                  }
                />
                <Button
                  onClick={() => logout()}
                  className="bg-red-600 text-white font-medium"
                  variant="destructive"
                  disabled={isLoggingOut}
                >
                  {isLoggingOut ? <Loader /> : 'Confirm'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="p-2 flex gap-2">
        <Sidebar
          className="h-fit"
          currentlySelected={currentPath}
          isHidden={isHidden}
        />
        <main className="w-full flex flex-col items-center p-2 rounded-sm">
          <div className="max-w-200 w-full bg-white p-2 rounded-sm">
            {children}
          </div>
        </main>
      </div>
    </>
  );
};

export default AppLayout;

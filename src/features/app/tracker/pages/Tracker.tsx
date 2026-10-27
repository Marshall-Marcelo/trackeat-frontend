import Button from '@/components/Button';
import { Link } from '@tanstack/react-router';
import { Plus } from 'lucide-react';

const Tracker = () => {
  return (
    <div className="flex flex-col gap-2 h-full">
      <Link to={'/app/new-meal'}>
        <Button className="bottom-8 right-4 absolute w-10 h-10 flex items-center justify-center rounded-full">
          <Plus />
        </Button>
      </Link>
    </div>
  );
};

export default Tracker;

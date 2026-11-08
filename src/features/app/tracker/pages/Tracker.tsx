import { useState } from 'react';
import Button from '@/components/Button';
import { Link } from '@tanstack/react-router';
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  getCurrentMonth,
  getCurrentYear,
  formatDate,
  formatDisplayDate,
} from '@/lib/utils/date';
import { addMonths, subMonths } from 'date-fns';

const Tracker = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const currentMonth = getCurrentMonth(currentDate);
  const currentYear = getCurrentYear(currentDate);

  const decreaseDate = () => {
    setCurrentDate((prev) => subMonths(prev, 1));
  };

  const increaseDate = () => {
    setCurrentDate((prev) => addMonths(prev, 1));
  };

  return (
    <div className="flex flex-col gap-2 h-full">
      <div className="flex justify-between">
        <ChevronLeft className="hover:cursor-pointer" onClick={decreaseDate} />
        {`${currentMonth} ${currentYear} `}
        <ChevronRight className="hover:cursor-pointer" onClick={increaseDate} />
      </div>
      <div className="flex justify-evenly text-sm">
        <div className="flex flex-col items-center">
          <span>Total Meals</span>
          <span>12</span>
        </div>
        <div className="flex flex-col items-center">
          <span>Top Meal Type</span>
          <span>Snack</span>
        </div>
      </div>
      <div></div>
      <Link to={'/app/new-meal'}>
        <Button className="bottom-8 right-4 absolute w-10 h-10 flex items-center justify-center rounded-full">
          <Plus />
        </Button>
      </Link>
    </div>
  );
};

export default Tracker;

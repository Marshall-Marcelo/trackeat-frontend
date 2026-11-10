import { useState } from 'react';
import { ChevronLeft, ChevronRight, Utensils } from 'lucide-react';
import {
  getCurrentMonthForDB,
  getCurrentYearForDB,
  formatDateForNav,
  formatDisplayDate,
} from '@/lib/utils/date';
import { addMonths, subMonths } from 'date-fns';
import { useGetUserMeals } from '@/hooks/useMeal';
import type { Meal } from '@/types/meal';

const Tracker = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const navDate = formatDateForNav(currentDate);
  const currentMonthDB = getCurrentMonthForDB(currentDate);
  const currentYearDB = getCurrentYearForDB(currentDate);

  const { data: meals = [] } = useGetUserMeals(currentYearDB, currentMonthDB);

  const groupedMeals = meals.reduce<Record<string, Meal[]>>((groups, meal) => {
    const date = meal.mealDate;

    if (!groups[date]) {
      groups[date] = [];
    }

    groups[date].push(meal);

    return groups;
  }, {});

  const transform = Object.entries(groupedMeals);

  console.log(transform, currentMonthDB);

  const decreaseDate = () => {
    setCurrentDate((prev) => subMonths(prev, 1));
  };

  const increaseDate = () => {
    setCurrentDate((prev) => addMonths(prev, 1));
  };

  return (
    <div className="flex flex-col gap-2 h-full">
      <div className="flex justify-between font-bold">
        <ChevronLeft className="hover:cursor-pointer" onClick={decreaseDate} />
        {`${navDate}`}
        <ChevronRight className="hover:cursor-pointer" onClick={increaseDate} />
      </div>
      <div className="flex justify-evenly text-sm font-semibold">
        <div className="flex flex-col items-center">
          <span>Total Meals</span>
          <span>{meals.length}</span>
        </div>
        <div className="flex flex-col items-center">
          <span>Top Meal Type</span>
          <span>Snack</span>
        </div>
      </div>
      <div>
        {transform.map(([date, meals]) => (
          <div key={date} className="mb-2">
            <h1 className="font-medium mb-1">{formatDisplayDate(date)}</h1>
            <div className="overflow-hidden rounded-xl border divide-y text-sm">
              {meals.map((meal) => (
                <div className="p-2 flex items-center gap-2" key={meal.mealId}>
                  <Utensils />
                  <div className="flex flex-col overflow-x-auto scrollbar-hide">
                    <span>{meal.mealName}</span>
                    <div className="flex gap-1 font-light ">
                      <span>{meal.mealType.typeName}</span> |
                      {meal.mealCategories.map((category, i) => (
                        <span>
                          {category.categoryName}
                          {i + 1 < meal.mealCategories.length ? ',' : ''}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tracker;

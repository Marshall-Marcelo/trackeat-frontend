import { useState, useMemo } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Utensils,
  FaceSlightlyFrowning,
  LoaderCircle,
} from 'lucide-react';
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

  const { data: meals = [], isPending: isFetchingMeals } = useGetUserMeals(
    currentYearDB,
    currentMonthDB,
  );

  const groupedMeals = useMemo(() => {
    return meals.reduce<Record<string, Meal[]>>((groups, meal) => {
      const date = meal.mealDate;

      if (!groups[date]) {
        groups[date] = [];
      }

      groups[date].push(meal);

      return groups;
    }, {});
  }, [meals]);

  const transformedGroupMeals = Object.entries(groupedMeals);

  const grouptedMealTypes = useMemo(() => {
    return meals.reduce<Record<string, number>>((mealTypes, meal) => {
      const mealType = meal.mealType.typeName;

      if (!mealTypes[mealType]) {
        mealTypes[mealType] = 0;
      }

      mealTypes[mealType]++;

      return mealTypes;
    }, {});
  }, [meals]);

  const transformedGroupMealTypes = Object.entries(grouptedMealTypes);

  const highestMealType = useMemo(() => {
    return transformedGroupMealTypes.reduce<[string, number]>(
      (highest, curr) => {
        if (curr[1] > highest[1]) {
          highest = curr;
        }

        if (curr[1] === highest[1] && curr[0] !== highest[0]) {
          highest[0] += ' | ' + curr[0];
        }

        return highest;
      },
      ['', 0],
    );
  }, [transformedGroupMealTypes]);

  if (isFetchingMeals) {
    return (
      <div className="flex h-full items-center justify-center">
        <LoaderCircle className="animate-spin" size={32} />
      </div>
    );
  }

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
          <span>
            {highestMealType[1] !== 0 ? highestMealType[0] : 'No Meals'}
          </span>
        </div>
      </div>
      <div className="">
        {meals.length !== 0 && !isFetchingMeals ? (
          transformedGroupMeals.map(([date, meals]) => (
            <div key={date} className="mb-2">
              <h1 className="font-medium mb-1">{formatDisplayDate(date)}</h1>
              <div className="overflow-hidden rounded-xl border divide-y text-sm">
                {meals.map((meal) => (
                  <div
                    className="p-2 flex items-center gap-2"
                    key={meal.mealId}
                  >
                    <Utensils />
                    <div className="flex flex-col overflow-x-auto scrollbar-hide">
                      <span>{meal.mealName}</span>
                      <div className="flex gap-1 font-light ">
                        <span>{meal.mealType.typeName}</span> |
                        {meal.mealCategories.map((category, i) => (
                          <span key={category.categoryId}>
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
          ))
        ) : (
          <div className="flex mt-10 flex-col items-center">
            <FaceSlightlyFrowning size={120} strokeWidth={0.5} />
            <span className="font-light text-sm">
              No meals listed for this month{' '}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tracker;

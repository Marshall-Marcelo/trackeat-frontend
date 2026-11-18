import { useMemo } from 'react';
import Card from '@/components/Card';
import { CircleSmall } from 'lucide-react';
import { useGetUserMeals } from '@/hooks/useMeal';
import {
  getCurrentMonthForDB,
  getCurrentYearForDB,
  formatDateToDb,
} from '@/lib/utils/date';
import type { Meal } from '@/types/meal';
import PieChartLabeled from '@/components/charts/PieChartLabeled';
import type { ChartLabels } from '@/types/chart';
import { useAuth } from '@/hooks/useAuth';
import { formatDisplayDate } from '@/lib/utils/date';
import Loader from '@/components/Loader';

const Dashboard = () => {
  const currentDate = new Date();
  const auth = useAuth();
  const year = getCurrentYearForDB(currentDate);
  const month = getCurrentMonthForDB(currentDate);
  const currentDateParsed = formatDateToDb(currentDate);

  const getPreviousMonth = () => {
    let prevMonth = Number(month);
    let prevYear = Number(year);

    if (prevMonth === 1) {
      prevMonth = 12;
      prevYear--;
    } else {
      prevMonth--;
    }

    return {
      parsedMonth: String(prevMonth).padStart(2, '0'),
      parsedYear: String(prevYear),
    };
  };

  const { parsedMonth, parsedYear } = getPreviousMonth();

  const { data: meals = [], isPending: isFetchingMeals } = useGetUserMeals(
    year,
    month,
  );
  const { data: prevMeals = [], isPending: isFetchingPrevMeals } =
    useGetUserMeals(parsedYear, parsedMonth);

  const groupMealsByDate = useMemo(() => {
    return meals.reduce<Record<string, Meal[]>>((groups, meal) => {
      const date = meal.mealDate;

      if (!groups[date]) {
        groups[date] = [];
      }

      groups[date].push(meal);

      return groups;
    }, {});
  }, [meals]);

  const transformedGroupMeals = Object.entries(groupMealsByDate);

  const mealsToday = transformedGroupMeals.find(([date, meal]) => {
    if (date === currentDateParsed) {
      return meal;
    }
  });

  const groupMealsByCategory = useMemo(() => {
    return meals.reduce<Record<string, number>>((groups, meal) => {
      const categories = meal.mealCategories;

      for (const category of categories) {
        if (!groups[category.categoryName]) {
          groups[category.categoryName] = 0;
        }

        groups[category.categoryName]++;
      }

      return groups;
    }, {});
  }, [meals]);

  const highestMealCategory = Object.entries(groupMealsByCategory)
    .map(([category, count]) => ({
      category,
      count,
    }))
    .filter((meal) => meal.category !== 'Rice' && meal.category !== 'Bread')
    .sort((a, b) => b.count - a.count);

  const mealsByCategoryForCharts: ChartLabels[] = Object.entries(
    groupMealsByCategory,
  ).map(([name, value]) => ({
    name,
    value,
  }));

  const groupMealsByType = useMemo(() => {
    return meals.reduce<Record<string, number>>((mealTypes, meal) => {
      const mealType = meal.mealType.typeName;

      if (!mealTypes[mealType]) {
        mealTypes[mealType] = 0;
      }

      mealTypes[mealType]++;

      return mealTypes;
    }, {});
  }, [meals]);

  const highestMealType = Object.entries(groupMealsByType)
    .map(([type, count]) => ({
      type,
      count,
    }))
    .sort((a, b) => b.count - a.count);

  if (isFetchingMeals || isFetchingPrevMeals) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader />
      </div>
    );
  }

  const mealsByTypeForCharts: ChartLabels[] = Object.entries(
    groupMealsByType,
  ).map(([name, value]) => ({
    name,
    value,
  }));

  const mealDifference = Math.abs(meals.length - prevMeals.length);

  return (
    <div className="flex flex-col gap-2 items-center">
      <span className="self-start text-xl">Hellow, {auth.user?.username}</span>

      <div className="w-full flex flex-col gap-0.5 rounded-lg shadow p-2">
        <span className="font-light">Meals Analysis</span>
        <div className="flex gap-1 items-start font-light">
          <CircleSmall className="mt-2 shrink-0" size={10} fill="black" />
          <span>
            You logged{' '}
            {mealDifference === 0 ? (
              <span>
                the <span className="font-medium">same</span> count of
              </span>
            ) : (
              <span className="font-medium">{mealDifference}</span>
            )}
            {mealDifference === 0
              ? ' meals compared to last month'
              : meals.length > prevMeals.length
                ? ' more meal/s compared to last month'
                : ' fewer meal/s compared to last month'}
          </span>
        </div>

        {highestMealType.length > 2 && (
          <div className="flex gap-1 items-center font-light">
            <CircleSmall className="shrink-0" size={10} fill="black" />
            <span>
              You mostly eat during{' '}
              <span className="font-medium">{highestMealType[0].type}</span>{' '}
              time and the least during{' '}
              <span className="font-medium">
                {highestMealType[highestMealType.length - 1].type}
              </span>{' '}
              time
            </span>
          </div>
        )}

        {highestMealCategory.length > 2 && (
          <div className="flex gap-1 items-center font-light">
            <CircleSmall className="shrink-0" size={10} fill="black" />
            <span>
              You frequently eat{' '}
              <span className="font-medium">
                {highestMealCategory[0].category}
              </span>{' '}
              meals and rarely eat{' '}
              <span className="font-medium">
                {highestMealCategory[highestMealCategory.length - 1].category}
              </span>{' '}
              meals
            </span>
          </div>
        )}
      </div>

      <div className="flex gap-4 justify-evenly w-full">
        <Card
          className="flex-1"
          cardTitle={'Total meals'}
          cardValue={meals.length}
          cardDescription="This month"
        />
        <Card
          className="flex-1"
          cardTitle="Meals Today"
          cardValue={mealsToday ? mealsToday[1].length : 'No Meals'}
          cardDescription={formatDisplayDate(currentDate)}
        />
      </div>

      <div className="w-full md:flex gap-4">
        <div className="w-full flex flex-col items-center rounded-lg shadow p-2">
          <span className="font-light self-start">Meal Category Breakdown</span>
          {meals.length === 0 ? (
            <p className="text-center text-sm font-light">
              Provide more data for chart display breakdown
            </p>
          ) : (
            <PieChartLabeled data={mealsByCategoryForCharts} />
          )}
        </div>

        <div className="w-full flex flex-col items-center rounded-lg shadow p-2">
          <span className="font-light self-start">Meal Type Breakdown</span>
          {meals.length === 0 ? (
            <p className="text-center text-sm font-light">
              Provide more data for chart display breakdown
            </p>
          ) : (
            <PieChartLabeled data={mealsByTypeForCharts} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

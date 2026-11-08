import { useMutation, useQuery } from '@tanstack/react-query';
import { mealService } from '@/service/meal';
import type { NewMeal } from '@/types/meal';
import { queryKeys } from '@/lib/utils/query-keys';

export function useCreateNewMeal() {
  return useMutation({
    mutationFn: ({ mealName, mealType, mealCategories, mealDate }: NewMeal) =>
      mealService.createMeal(mealName, mealType, mealCategories, mealDate),

    onSuccess: () => {},
  });
}

export function useGetMealCategories() {
  return useQuery({
    queryKey: queryKeys.meal.categories(),
    queryFn: () => mealService.getMealCategories(),
  });
}

import { useMutation } from '@tanstack/react-query';
import { mealService } from '@/service/meal';
import type { NewMeal } from '@/types/meal';

export function useCreateNewMeal() {
  return useMutation({
    mutationFn: ({ mealName, mealType, mealCategories, mealDate }: NewMeal) =>
      mealService.createMeal(mealName, mealType, mealCategories, mealDate),
  });
}

export function

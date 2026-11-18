import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { mealService } from '@/service/meal';
import type { NewMeal, ExistingMealEdit } from '@/types/meal';
import { queryKeys } from '@/lib/utils/query-keys';

export function useCreateNewMeal() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ mealName, mealType, mealCategories, mealDate }: NewMeal) =>
      mealService.createMeal(mealName, mealType, mealCategories, mealDate),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.meal.all() });
    },
  });
}

export function useEditMeal() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      mealId,
      mealName,
      mealType,
      mealCategories,
      mealDate,
    }: ExistingMealEdit) =>
      mealService.editMeal(
        mealId,
        mealName,
        mealType,
        mealCategories,
        mealDate,
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.meal.all(),
      });
    },
  });
}

export function useGetMealCategories() {
  return useQuery({
    queryKey: queryKeys.meal.categories(),
    queryFn: () => mealService.getMealCategories(),
  });
}

export function useGetMealTypes() {
  return useQuery({
    queryKey: queryKeys.meal.types(),
    queryFn: () => mealService.getMealTypes(),
  });
}

export function useGetUserMeals(year: string, month: string) {
  return useQuery({
    queryKey: queryKeys.meal.list(year, month),
    queryFn: () => mealService.getUserMeals(year, month),
  });
}

export function useGetSelectedMeal(mealId: string) {
  return useQuery({
    queryKey: queryKeys.meal.single(mealId),
    queryFn: () => mealService.getSelectedMeal(mealId),
  });
}

export function useDeleteMeal(year: string, month: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (mealId: string) => mealService.deleteSelectedMeal(mealId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.meal.list(year, month),
      });
    },
  });
}

export const queryKeys = {
  user: {
    current: () => ['currentUser'] as const,
  },

  meal: {
    all: () => ['meals'] as const,
    single: (mealId: string) => [...queryKeys.meal.all(), mealId] as const,
    list: (year: string, month: string) =>
      [...queryKeys.meal.all(), year, month] as const,
    categories: () => ['mealCategories'] as const,
    types: () => ['mealTypes'] as const,
  },
} as const;

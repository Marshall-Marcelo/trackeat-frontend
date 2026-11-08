export const queryKeys = {
  user: {
    current: () => ['currentUser'] as const,
  },

  meal: {
    categories: () => ['mealCategories'] as const,
  },
} as const;

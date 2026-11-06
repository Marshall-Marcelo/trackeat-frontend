export interface NewMeal {
  mealName: string;
  mealType: string;
  mealCategories: string[];
  mealDate: string;
}

export interface MealCategory {
  categoryId: string;
  categoryName: string;
}

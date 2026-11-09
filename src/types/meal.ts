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

export interface MealType {
  typeId: string;
  typeName: string;
}

export interface Meal {
  mealId: string;
  mealName: string;
  mealDate: string;
  mealType: MealType;
  mealCategories: MealCategory[];
}

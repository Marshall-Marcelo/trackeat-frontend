import { ApiService } from './api';
import type { MessageResponse } from '@/types/response';
import type { MealCategory, MealType } from '@/types/meal';

class MealService extends ApiService {
  async createMeal(
    mealName: string,
    mealType: string,
    mealCategories: string[],
    mealDate: string,
  ): Promise<MessageResponse> {
    const data: MessageResponse = await this.handleFetch(`/meal/new-meal`, {
      method: 'POST',
      body: JSON.stringify({ mealName, mealType, mealCategories, mealDate }),
    });

    return data;
  }

  async getMealCategories(): Promise<MealCategory[]> {
    const data: MealCategory[] = await this.handleFetch(
      `/meal/get-meal-categories`,
      {
        method: 'GET',
      },
    );

    return data;
  }

  async getMealTypes(): Promise<MealType[]> {
    const data: MealType[] = await this.handleFetch(`/meal/get-meal-types`, {
      method: 'GET',
    });

    return data;
  }
}

export const mealService = new MealService();

export type FoodType = {
  id: number;
  name: string;
  market: string;
  carbs: number;
  proteins: number;
  fats: number;
};

export type MenuType = {
  id: number;
  name: string;
  numberOfMeals: number;
};

export type MenuFoodType = {
  id: number;
  menuId: number;
  foodId: number;
  quantity: number;
  mealNumber: number;
};

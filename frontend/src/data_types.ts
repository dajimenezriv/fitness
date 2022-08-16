export type FoodType = {
  id: number;
  name: string;
  market: string;
  calories: number;
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

  // same as food type
  name: string;
  market: string;
  calories: number;
  carbs: number;
  proteins: number;
  fats: number;
};

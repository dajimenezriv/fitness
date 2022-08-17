/* eslint object-curly-newline: off */

// ids are symbolic
// they are only use to track the index to add the menuFoods

import { FoodType, MenuType } from 'data_types';

export const foods: FoodType[] = [
  { id: 0, name: 'Banana', market: 'Mercadona', calories: 92, carbs: 23, proteins: 12, fats: 0.5 },
  { id: 1, name: 'Arroz', market: 'Mercadona', calories: 350, carbs: 60, proteins: 6, fats: 0.001 },
  { id: 2, name: 'Macarrones', market: 'Mercadona', calories: 186, carbs: 68, proteins: 7, fats: 0.0002 },
];

export const menus: MenuType[] = [
  { id: 0, name: 'Déficit', numberOfMeals: 3 },
  { id: 1, name: 'Volumen', numberOfMeals: 5 },
];

export const menuFoods = [
  { id: 0, menuId: 0, foodId: 0, quantity: 125, mealNumber: 0 },
  { id: 1, menuId: 0, foodId: 0, quantity: 75, mealNumber: 1 },
  { id: 2, menuId: 0, foodId: 1, quantity: 150, mealNumber: 0 },
];

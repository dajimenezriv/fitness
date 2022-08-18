/* eslint object-curly-newline: off */

// ids are symbolic
// they are only use to track the index to add the menuFoods

import { FoodType, MenuType } from 'data_types';

export const foods: FoodType[] = [
  { id: 0, name: 'Banana', market: 'Mercadona', calories: 92, carbs: 23, proteins: 12, fats: 0.5 },
  { id: 1, name: 'Arroz', market: 'Mercadona', calories: 350, carbs: 60, proteins: 6, fats: 0.001 },
  { id: 2, name: 'Macarrones', market: 'Mercadona', calories: 186, carbs: 68, proteins: 7, fats: 0.0002 },
  { id: 3, name: 'Huevos', market: 'Mercadona', calories: 124, carbs: 2, proteins: 16, fats: 8 },
  { id: 4, name: 'Leche Entera', market: 'Mercadona', calories: 120, carbs: 4, proteins: 8, fats: 10 },
  { id: 5, name: 'Merluza', market: 'Mercadona', calories: 154, carbs: 0, proteins: 27, fats: 2 },
  { id: 6, name: 'Pechuga de Pavo', market: 'Mercadona', calories: 171, carbs: 0, proteins: 32, fats: 1 },
  { id: 7, name: 'Pan', market: 'Mercadona', calories: 250, carbs: 45, proteins: 2, fats: 0.1 },

  { id: 8, name: 'Test 1', market: 'Mercadona', calories: 250, carbs: 45, proteins: 2, fats: 0.1 },
  { id: 9, name: 'Test 2', market: 'Mercadona', calories: 250, carbs: 45, proteins: 2, fats: 0.1 },
  { id: 10, name: 'Test 3', market: 'Mercadona', calories: 250, carbs: 45, proteins: 2, fats: 0.1 },
  { id: 11, name: 'Test 4', market: 'Mercadona', calories: 250, carbs: 45, proteins: 2, fats: 0.1 },
  { id: 12, name: 'Test 5', market: 'Mercadona', calories: 250, carbs: 45, proteins: 2, fats: 0.1 },
  { id: 13, name: 'Test 6', market: 'Mercadona', calories: 250, carbs: 45, proteins: 2, fats: 0.1 },
  { id: 14, name: 'Test 7', market: 'Mercadona', calories: 250, carbs: 45, proteins: 2, fats: 0.1 },
  { id: 15, name: 'Test 8', market: 'Mercadona', calories: 250, carbs: 45, proteins: 2, fats: 0.1 },
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

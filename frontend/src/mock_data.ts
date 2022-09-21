/* eslint object-curly-newline: off */

// ids are symbolic
// they are only use to track the index to add the menuFoods

import { FoodType, NewMenuFoodType, MenuType, NewUserType, NumberDictType } from 'data_types';
import { mainNutrients } from 'nutrients';

export const users: NewUserType[] = [
  { username: 'admin', email: 'admin@mail.com', password: '1234' },
  { username: 'user', email: 'user@mail.com', password: '2345' },
];

export const foods: FoodType[] = [];

for (let i = 0; i < 20; i++) {
  const nutrients: NumberDictType = {};
  mainNutrients.forEach((nutrient) => {
    nutrients[nutrient] = Math.round(Math.random() * 100 * 100) / 100;
  });
  foods.push({ id: i, name: `Food ${i}`, nutrients });
}

export const menus: MenuType[] = [
  { id: 0, name: 'Déficit', numberOfMeals: 3 },
  { id: 1, name: 'Volumen', numberOfMeals: 5 },
];

export const menuFoods: NewMenuFoodType[] = [
  { menuId: 0, foodId: 0, quantity: 100, mealNumber: 0 },
  { menuId: 0, foodId: 0, quantity: 100, mealNumber: 1 },
  { menuId: 0, foodId: 1, quantity: 100, mealNumber: 0 },
];

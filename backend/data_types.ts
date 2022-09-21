/*
 *
 * USER
 *
 */

export type NewUserType = {
  username: string;
  email: string;
  password: string;
};

export type UserType = {
  id: number;
  username: string;
  email: string;
  password: string;
};

/*
 *
 * FOOD
 *
 */

export type NewFoodType = {
  name: string;
  nutrients: any;
};

export type FoodType = {
  id: number;
  name: string;
  nutrients: any;
};

/*
 *
 * MENU
 *
 */

export type NewMenuType = {
  name: string;
  numberOfMeals: number;
};

export type MenuType = {
  id: number;
  name: string;
  numberOfMeals: number;
};

/*
 *
 * MENU FOOD
 *
 */

export type NewMenuFoodType = {
  menuId: number;
  foodId: number;
  quantity: number;
  mealNumber: number;
};

export type MenuFoodType = {
  id: number;
  menuId: number;
  foodId: number;
  quantity: number;
  mealNumber: number;
};

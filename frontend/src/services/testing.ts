/* eslint no-restricted-syntax: off */
/* eslint no-await-in-loop: off */

import axios from 'axios';
import { foods, menus, menuFoods } from 'mock_data';
import { MenuFoodType } from 'data_types';
import * as foodsService from './foods';
import * as menusService from './menus';
import * as menuFoodsService from './menuFoods';
import baseUrl from './helper';

const url = `${baseUrl}/testing`;

export const deleteAll = () => axios.get(`${url}/deleteAll`);

export const createTestingDB = async () => {
  const foodIds: number[] = [];
  const menuIds: number[] = [];

  await deleteAll();

  for (const food of foods) foodIds.push((await foodsService.add(food)).data.id);
  for (const menu of menus) menuIds.push((await menusService.add(menu)).data.id);
  for (const menuFood of menuFoods) {
    // instead of the ids, it contains the index of the ids
    const { menuId, foodId } = menuFood;
    const newMenuFood = { ...menuFood, menuId: menuIds[menuId], foodId: foodIds[foodId] };
    menuFoodsService.add(newMenuFood as MenuFoodType);
  }
};

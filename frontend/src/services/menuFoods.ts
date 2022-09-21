import { MenuFoodType, NewMenuFoodType } from 'data_types';
import { baseUrl, client } from './helper';

const url = `${baseUrl}/menu_foods`;

export const getByMenuId = (menuId: number) => client().get(`${url}/?menu_id=${menuId}`);
export const getById = (id: number) => client().get(`${url}/${id}`);
export const add = (menuFood: NewMenuFoodType) => client().post(url, menuFood);
export const update = (menuFood: MenuFoodType) => client().put(url, menuFood);
export const deleteById = (id: number) => client().delete(`${url}/${id}`);

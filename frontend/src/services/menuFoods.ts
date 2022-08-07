import axios from 'axios';
import { MenuFoodType } from 'data_types';
import baseUrl from './helper';

const url = `${baseUrl}/menus`;

export const getByMenuId = (menuId: number) => axios.get(`${url}/${menuId}/foods`);
export const getById = (menuId: number, id: number) => axios.get(`${url}/${menuId}/foods/${id}`);
export const add = (menuId: number, menuFood: MenuFoodType) => axios.post(`${url}/${menuId}/foods`, menuFood);
export const update = (menuId: number, menuFood: MenuFoodType) => axios.put(`${url}/${menuId}/foods`, menuFood);
export const deleteById = (menuId: number, id: number) => axios.delete(`${url}/${menuId}/foods/${id}`);

import axios from 'axios';
import { MenuFoodType } from 'data_types';
import baseUrl from './helper';

const url = `${baseUrl}/menu_foods`;

export const getByMenuId = (menuId: number) => axios.get(`${url}/?menu_id=${menuId}`);
export const getById = (id: number) => axios.get(`${url}/${id}`);
export const add = (menuFood: MenuFoodType) => axios.post(url, menuFood);
export const update = (menuFood: MenuFoodType) => axios.put(url, menuFood);
export const deleteById = (id: number) => axios.delete(`${url}/${id}`);

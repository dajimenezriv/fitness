import { FoodType, NewFoodType } from 'data_types';
import { baseUrl, client } from './helper';

const url = `${baseUrl}/foods`;

export const getAll = () => client().get(url);
export const getById = (id: number) => client().get(`${url}/${id}`);
export const getByName = (name: string) => client().get(`${url}/?name=${name}`);
export const add = (food: NewFoodType) => client().post(url, food);
export const update = (food: FoodType) => client().put(url, food);
export const deleteById = (id: number) => client().delete(`${url}/${id}`);
export const deleteAll = () => client().delete(url);

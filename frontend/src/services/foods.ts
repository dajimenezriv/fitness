import axios from 'axios';
import { FoodType } from 'data_types';
import baseUrl from './helper';

const url = `${baseUrl}/foods`;

export const getAll = () => axios.get(url);
export const getById = (id: number) => axios.get(`${url}/${id}`);
export const search = (name: string) => axios.get(`${url}/?name=${name}`);
export const add = (food: FoodType) => axios.post(url, food);
export const update = (food: FoodType) => axios.put(url, food);
export const deleteById = (id: number) => axios.delete(`${url}/${id}`);
export const deleteAll = () => axios.delete(url);

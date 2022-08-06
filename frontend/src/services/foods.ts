import axios from 'axios';
import { Food } from 'data_types';
import baseUrl from './helper';

const url = `${baseUrl}/foods`;

export const getAll = () => axios.get(url);
export const getById = (id: number) => axios.get(`${url}/${id}`);
export const add = (food: Food) => axios.post(url, food);
export const update = (food: Food) => axios.put(url, food);
export const deleteById = (id: number) => axios.delete(`${url}/${id}`);
export const deleteAll = () => axios.delete(url);

import axios from 'axios';
import { MenuType } from 'data_types';
import baseUrl from './helper';

const url = `${baseUrl}/menus`;

export const getAll = () => axios.get(url);
export const getById = (id: number) => axios.get(`${url}/${id}`);
export const add = (menu: MenuType) => axios.post(url, menu);
export const update = (menu: MenuType) => axios.put(url, menu);
export const deleteById = (id: number) => axios.delete(`${url}/${id}`);
export const deleteAll = () => axios.delete(url);

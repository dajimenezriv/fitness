import { MenuType } from 'data_types';
import { baseUrl, client } from './helper';

const url = `${baseUrl}/menus`;

export const getAll = () => client().get(url);
export const getById = (id: number) => client().get(`${url}/${id}`);
export const getByName = (name: string) => client().get(`${url}/?name=${name}`);
export const add = (menu: MenuType) => client().post(url, menu);
export const update = (menu: MenuType) => client().put(url, menu);
export const deleteById = (id: number) => client().delete(`${url}/${id}`);
export const deleteAll = () => client().delete(url);

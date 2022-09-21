import { NewUserType } from 'data_types';
import { baseUrl, client } from './helper';

const url = `${baseUrl}/users`;

export const getAll = () => client().get(url);
export const getById = (id: number) => client().get(`${url}/${id}`);
export const getLoggedUser = () => client().get(`${url}/logged`);
export const register = (user: NewUserType) => client().post(`${url}/register`, user);
export const login = (user: NewUserType) => client().post(`${url}/login`, user);
export const deleteById = (id: number) => client().delete(`${url}/${id}`);
export const deleteAll = () => client().delete(url);

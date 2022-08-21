import axios from 'axios';
import { UserType } from 'data_types';
import baseUrl from './helper';

const url = `${baseUrl}/users`;

export const getAll = () => axios.get(url);
export const getById = (id: number) => axios.get(`${url}/${id}`);
export const getLoggedUser = () => axios.get(`${url}/logged`);
export const register = (user: UserType) => axios.post(`${url}/register`, user);
export const login = (user: UserType) => axios.post(`${url}/login`, user);
export const deleteById = (id: number) => axios.delete(`${url}/${id}`);
export const deleteAll = () => axios.delete(url);

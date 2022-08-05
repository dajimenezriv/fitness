import axios from 'axios';
import baseUrl from './helper';

const url = `${baseUrl}/foods`;

export const getAll = () => axios.get(url);

export default getAll;

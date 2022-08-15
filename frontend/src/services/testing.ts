import axios from 'axios';
import baseUrl from './helper';

const url = `${baseUrl}/testing`;

export const resetDB = () => axios.get(url);
export default resetDB;

import axios from 'axios';

export const baseUrl = 'http://localhost:3001/api';

export const client = () => {
  const jwtToken = localStorage.getItem('jwtToken');

  const defaultOptions = {
    headers: {
      Authorization: jwtToken ? `Bearer ${jwtToken}` : '',
    },
  };

  return {
    get: (url: string, options = {}) => axios.get(url, { ...defaultOptions, ...options }),
    post: (url: string, data = {}, options = {}) => axios.post(url, data, { ...defaultOptions, ...options }),
    put: (url: string, data = {}, options = {}) => axios.put(url, data, { ...defaultOptions, ...options }),
    delete: (url: string, options = {}) => axios.delete(url, { ...defaultOptions, ...options }),
  };
};

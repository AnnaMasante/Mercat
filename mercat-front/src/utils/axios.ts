import axios, { AxiosInstance } from 'axios';

export function prepareAxiosInstance(): AxiosInstance {
  return axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001',
    headers: {
      'Access-Control-Allow-Origin': '*',
      crossorigin: true,
    },
  });
}

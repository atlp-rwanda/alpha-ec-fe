'use client';

import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  Method,
  AxiosResponse
} from 'axios';

export const URL = process.env.NEXT_PUBLIC_API_URL;

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: `${URL}/api`,
  headers: {
    'Content-Type': 'application/json'
  }
});

interface CustomAxiosConfig extends AxiosRequestConfig {
  authenticate?: boolean;
}

export let token: string | null = null;
if (typeof window !== 'undefined') {
  const tokenString = localStorage.getItem('token');
  if (tokenString) {
    try {
      token = JSON.parse(tokenString);
    } catch (error) {
      console.error('Failed to parse token from localStorage', error);
    }
  }
}

export const axiosRequest = async <TRequest = any, TResponse = any>(
  method: Method,
  url: string,
  data?: TRequest,
  authenticate?: boolean
): Promise<AxiosResponse<TResponse>> => {
  const headers = { ...axiosInstance.defaults.headers.common };

  if (authenticate && token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  // if (authenticate) {
  //   const token = JSON.parse(localStorage.getItem('token') || '');
  //   console.log('tokennnnn', token);
  //   headers['Authorization'] = `Bearer ${token['data']}`;
  const requestConfig: CustomAxiosConfig = {
    method,
    url,
    data,
    headers
  };

  return axiosInstance.request<TResponse>(requestConfig);
};

export default axiosInstance;

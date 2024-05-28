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

export const axiosRequest = async <T = any>(
  method: Method,
  url: string,
  data?: T,
  authenticate?: boolean
): Promise<AxiosResponse<T>> => {
  const headers = { ...axiosInstance.defaults.headers.common };

  if (authenticate) {
    headers['Authorization'] = 'Bearer TOKEN';
  }

  const requestConfig: CustomAxiosConfig = {
    method,
    url,
    data,
    headers
  };

  return axiosInstance.request<T>(requestConfig);
};

export default axiosInstance;

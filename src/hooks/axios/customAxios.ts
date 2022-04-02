import axios, {AxiosRequestConfig} from 'axios';

export const customAxios = async (config: AxiosRequestConfig) => {
  const result = await axios(config);

  return {
    message: result.statusText,
    code: result.status,
    data: result.data,
  };
};

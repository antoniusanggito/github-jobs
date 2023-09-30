import axios from 'axios';
import { headers, endpoint } from '../constants';

interface loginParam {
  username: string;
  password: string;
}

export const loginRequest = async (params: loginParam) => {
  const options = {
    headers,
  };

  try {
    const axiosData = await axios.post(endpoint.login, params, options);
    return axiosData.data;
  } catch (error: any) {
    throw error.response;
  }
};

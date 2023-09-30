import axios from 'axios';
import { headers, endpoint } from '../constants';
import Cookies from 'js-cookie';

interface getAllJobParam {
  description?: string;
  location?: string;
  full_time?: boolean;
  page?: number;
}

export const getAllJobRequest = async (params: getAllJobParam) => {
  const options = {
    headers: {
      ...headers,
      Authorization: `Bearer ${Cookies.get('token')}`,
    },
    params,
  };

  try {
    const axiosData = await axios.get(endpoint.job, options);
    return axiosData.data;
  } catch (error: any) {
    throw error.response;
  }
};

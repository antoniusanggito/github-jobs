import axios from 'axios';
import { headers, endpoint } from '../constants';
import Cookies from 'js-cookie';

interface getDetailJobParam {
  jobId: string;
}

export const getDetailJobRequest = async (params: getDetailJobParam) => {
  const { jobId } = params;

  const options = {
    headers: {
      ...headers,
      Authorization: `Bearer ${Cookies.get('token')}`,
    },
  };

  try {
    const axiosData = await axios.get(`${endpoint.job}/${jobId}`, options);
    return axiosData.data;
  } catch (error: any) {
    throw error.response;
  }
};

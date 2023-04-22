import axios from 'axios';

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject((error.response.data || error.response || error) || 'Something went wrong')
  }
);

export default axiosInstance;

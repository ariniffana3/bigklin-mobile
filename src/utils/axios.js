import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const axiosApiIntances = axios.create({
  baseURL: 'https://bigklin.vercel.app/',
  // baseURL: 'https://192.168.1.28:3003/',
});

axiosApiIntances.interceptors.request.use(
  async function (config) {
    const token = await AsyncStorage.getItem('token');
    config.headers = {
      Authorization: `Bearer ${token}`,
    };
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

axiosApiIntances.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const refreshToken = await AsyncStorage.getItem('refreshToken');
    if (error.response === 403) {
      if (error.response.data.msg === 'jwt expired') {
        axiosApiIntances
          .post('auth/refresh', {refreshToken})
          .then(async res => {
            await AsyncStorage.setItem('token', res.data.data.token);
            await AsyncStorage.setItem(
              'refreshToken',
              res.data.data.refreshToken,
            );
          })
          .catch(async err => {
            await AsyncStorage.removeItem('token');
            await AsyncStorage.removeItem('refreshToken');
          });
      } else {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('refreshToken');
      }
    }
    console.log(error);
    return Promise.reject(error);
  },
);

export default axiosApiIntances;

import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5050',
  timeout: 5000,
  withCredentials: true,
  xsrfCookieName: 'Authorization',
  xsrfHeaderName: 'Authorization',
});

instance.interceptors.request.use((config) => {
  // No need to add Authorization header since the token is included in the XSRF-TOKEN cookie
  return config;
});

instance.interceptors.response.use(resp => resp, async err => {
  if ((err.response.status === 401) && !err.response.config.retry) {
    err.response.config.retry = true;
    try {
      const response = await instance.get("/auth/refresh");
      if (response.status === 200) {
        return instance(err.response.config);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return Promise.reject(err);
});

export default instance;

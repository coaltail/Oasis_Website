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



export default instance;


import axios from 'axios';
export interface LoginData {
  email: string,
  password: string
}

const setAuthToken = (token: string) => {
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      sessionStorage.setItem('token', token);
    } else {
      sessionStorage.removeItem('token');
      delete axios.defaults.headers.common.Authorization;
    }
  };

export const loginUser = async(formData: LoginData) => {
    const response = await axios.post("http://localhost:5050/auth/login", {email: formData.email, password: formData.password});
    const token = response.data.token;
    setAuthToken(token);
    return token;
}

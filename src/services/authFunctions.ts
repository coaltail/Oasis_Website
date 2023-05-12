
import api from '../utils/axios';
export interface LoginData {
  email: string,
  password: string
}
const config = {
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
};

export const loginUser = async (formData: LoginData) => {
  const response = await api.post("/auth/login", { email: formData.email, password: formData.password }, config);
  console.log(response);
  const token = response.data;
  return token;
}

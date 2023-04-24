
import axios from 'axios';
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

export const loginUser = async(formData: LoginData) => {
    const response = await axios.post("http://localhost:5050/auth/login", {email: formData.email, password: formData.password}, config);
    const token = response.data;
    return token;
}

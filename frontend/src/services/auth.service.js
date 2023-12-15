import axios from './root.service';
import cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

export const login = async ({ email, password }) => {
  try {
    console.log(email);
    const response = await axios.post('auth/login', {
      email,
      password,
    });
    console.log(email);
    const { status, data } = response;
    if (status === 200) {
      const { email, roles } = await jwtDecode(data.data.accessToken);
      localStorage.setItem('user', JSON.stringify({ email, roles }));
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${data.data.accessToken}`;
      cookies.set('jwt-auth', data.data.accessToken, { path: '/' });
    }
    console.log(email)
  } catch (error) {
    console.log(error);
  }
};

export const logout = () => {
  localStorage.removeItem('user');
  delete axios.defaults.headers.common['Authorization'];
  cookies.remove('jwt');
  cookies.remove('jwt-auth');
};

export const test = async () => {
  try {
    const response = await axios.get('/users');
    const { status, data } = response;
    if (status === 200) {
      console.log(data.data);
    }
  } catch (error) {
    console.log(error);
  }
};

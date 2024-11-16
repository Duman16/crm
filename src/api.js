import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export const refreshAuthToken = async () => {
  try {
    const response = await axios.post('http://localhost:8000/api/auth/token/refresh/', {
      refresh: localStorage.getItem('refresh_token'),
    });
    const newToken = response.data.access;
    localStorage.setItem('token', newToken);
    setAuthToken(newToken);
  } catch (error) {
    console.error('Ошибка обновления токена', error);
  }
};

export default api;

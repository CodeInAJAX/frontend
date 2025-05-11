import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/v1/users',
  withCredentials: true,
});

// Ambil token dari localStorage kalau ada (pas app pertama jalan)
const token = localStorage.getItem('access_token');
if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

// Login
export async function login(email, password) {
  try {
    const res = await api.post('/login', { email, password, confirm_password: password });

    const token = res.data?.data?.access_token;
    if (!token) throw new Error('Token kosong!');

    localStorage.setItem('access_token', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return res.data;
  } catch (err) {
    console.error('Login error:', err);
    throw err;
  }
}

// Refresh token
async function refreshToken() {
  try {
    const res = await api.post('/refresh-token'); // fix typo
    const token = res.data?.data?.access_token;
    if (!token) throw new Error('Token refresh gagal!');

    localStorage.setItem('access_token', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return token;
  } catch (err) {
    console.error('Refresh token error', err);
    throw err;
  }
}

// Interceptor
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;
    const status = err.response?.status;

    if ((status === 401 || status === 403) && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newToken = await refreshToken();
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (error) {
        console.error('Interceptor failed:', error);
        return Promise.reject(error);
      }
    }

    return Promise.reject(err);
  }
);

// Logout
export async function logout() {
  try {
    await api.post('/logout');
    localStorage.removeItem('access_token');
    delete api.defaults.headers.common['Authorization'];
  } catch (err) {
    console.error('Logout error:', err);
    throw err;
  }
}

export default api;

import axios from 'axios';

// Create Instance Axios
const axiosInstance = axios.create({
    baseURL: 'http://103.210.35.189:8135/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});

// Interceptor for request to include access token
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor handle unauthorized
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                console.log('Request to refresh token...');
                const axiosResponse = await axios.get('/api/v1/users/refresh-token', {}, {
                    withCredentials: true
                });

                const refreshResponse = axiosResponse.data;

                if (refreshResponse.data && refreshResponse.data.access_token) {
                    localStorage.setItem('token', refreshResponse.data.access_token);

                    // Update header Authorization
                    originalRequest.headers.Authorization = `Bearer ${refreshResponse.data.access_token}`;

                    return axios(originalRequest);
                }
            } catch (refreshError) {
                console.log('Failed Refresh token:', refreshError);

                localStorage.removeItem('token');

                window.location.href = '/login';
            }
        }

        return Promise.reject(error);
    }
);


export default axiosInstance;
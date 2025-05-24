import axios from 'axios';
import API_HOST_URL from 'src/env';

async function refreshToken() {
  const response = await fetch(`${API_HOST_URL}/refreshToken`, {
    method: 'POST',
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Failed to refresh token');
  }
  const data = await response.json();
  return data.access_token;
}

const axiosInstance = axios.create({
  baseURL: API_HOST_URL,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      try {
        const newToken = await refreshToken();
        axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;

        const originalRequest = error.config;
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
)
export default axiosInstance;
import axios from 'axios';
import API_HOST_URL from 'src/env';
async function refreshToken() {
  const response = await fetch(`${API_HOST_URL}/refreshToken`, {
    method: 'POST',
    credentials: 'include',
  });
  const data = await response.json();
  let accessToken = "";
  if (data.access_token) {
    accessToken = data.access_token;
  }
  return accessToken;
}

const axiosInstance = axios.create({
  baseURL: API_HOST_URL,
});

// Configure axios to include cookies with each request
axiosInstance.defaults.withCredentials = true;


// axiosInstance.interceptors.request.use(
//     (config) => {
//         const token = accessToken; // Get the access token from your state or context or session storage
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => {
//         // Handle request error
//         return Promise.reject(error);
//     }
// );


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
export { axiosInstance, refreshToken };
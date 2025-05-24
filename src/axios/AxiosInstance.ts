import axios from 'axios';
import API_HOST_URL from 'src/env';

const axiosInstance = axios.create({
  baseURL: API_HOST_URL
});

// Configure axios to include cookies with each request
axiosInstance.defaults.withCredentials = true;

function setAuthorizationHeader(token: string) {
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
}
async function refreshToken() {
  const response = await axiosInstance.post(`${API_HOST_URL}/refreshToken`);
  const data = response.data;
  let accessToken = "";
  if (data.access_token) {
    accessToken = data.access_token;
  }
  return accessToken;
}
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
export { axiosInstance, refreshToken, setAuthorizationHeader };
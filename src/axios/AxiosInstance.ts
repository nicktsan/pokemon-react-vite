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
  let accessToken = "";
  if (response.status !== 200) {
    throw new Error("Failed to refresh token");
  }
  const data = response.data;
  if (data.access_token) {
    accessToken = data.access_token;
  }
  return accessToken;
}
axiosInstance.interceptors.request.use(
    (config) => {
        const token = axiosInstance.defaults.headers.common['Authorization'];
        if (token) {
            config.headers.Authorization = token;
        }
        return config;
    },
    (error) => {
        // Handle request error
        return Promise.reject(error);
    }
);


axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // Prevent infinite loop by checking a custom _retry flag
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      try {
        originalRequest._retry = true; // Mark the request as retried to avoid infinite loops.
        const res = await axios.post(`${API_HOST_URL}/refreshToken`, {}, { withCredentials: true });
        let newToken = "";
        if (res.status !== 200) {
          throw new Error("Failed to refresh token");
        }
        const data = res.data;
        if (data.access_token) {
          newToken = data.access_token;
        }
        setAuthorizationHeader(newToken);
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Handle refresh token errors by clearing stored tokens and redirecting to the login page.
        console.error('Token refresh failed:', refreshError);
        setAuthorizationHeader("");
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
)
export { axiosInstance, refreshToken, setAuthorizationHeader };
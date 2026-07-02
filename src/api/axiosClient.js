import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://api.hoodmandu.com', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
axiosClient.interceptors.request.use(
  (config) => {
   
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosClient.interceptors.response.use(
  (response) => {
    return response.data; // Return only the data part of the response
  },
  (error) => {
    // Handle errors globally
    return Promise.reject(error);
  }
);

export default axiosClient;
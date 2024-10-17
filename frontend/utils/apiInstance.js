import axios from 'axios';

// Create an Axios instance without setting a base URL
const api = axios.create({
  timeout: 10000, // Set timeout as needed
});

// Function to set the authorization token
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

// Function to handle GET requests with a custom base URL
export const get = async (baseURL, params = {}, config = {}) => {
  try {
    const response = await api.get(`${baseURL}`, {
      params,
      ...config,
    });
    return response.data;
  } catch (error) {
    handleError(error);
    throw error; // Re-throw the error for further handling if necessary
  }
};

// Function to handle POST requests with a custom base URL
export const post = async (baseURL,  data, config = {}) => {
  try {
    const response = await api.post(`${baseURL}`, data, config);
    return response.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

// Function to handle PUT requests with a custom base URL
export const put = async (baseURL,  data, config = {}) => {
  try {
    const response = await api.put(`${baseURL}`, data, config);
    return response.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

// Function to handle DELETE requests with a custom base URL
export const del = async (baseURL, endpoint, config = {}) => {
  try {
    const response = await api.delete(`${baseURL}`, config);
    return response.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

// Error handling function
const handleError = (error) => {
  if (error.response) {
    // Server responded with a status other than 2xx
    console.error('API Error:', error.response.data);
  } else if (error.request) {
    // Request was made but no response received
    console.error('API Error: No response received', error.request);
  } else {
    // Something happened while setting up the request
    console.error('API Error:', error.message);
  }
};

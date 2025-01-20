import axios from "axios";

// Create an Axios instance with default configuration
const api = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL, // Use the base URL from the .env file
});

export default api;

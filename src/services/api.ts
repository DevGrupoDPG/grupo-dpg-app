import axios from 'axios';

const api = axios.create({
  baseURL: 'https://grupo-dpg-app.easydigitalinnovation.com.br'
});

export default api;
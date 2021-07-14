import axios from 'axios';

const api = axios.create({
  baseURL: 'http://br204.teste.website/~wzdeve86/page-speed/'
});

export default api;
import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token de autenticação (se necessário)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para tratamento de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Tratamento de erros específicos
      switch (error.response.status) {
        case 401:
          // Redirecionar para login
          window.location.href = '/login';
          break;
        case 403:
          // Acesso negado
          console.error('Acesso negado');
          break;
        case 404:
          // Recurso não encontrado
          console.error('Recurso não encontrado');
          break;
        default:
          console.error('Erro na requisição:', error.response.data);
      }
    }
    return Promise.reject(error);
  }
);

export default api; 
import axios from 'axios';

// Configuração da URL base da API
axios.defaults.baseURL = 'http://localhost:8080';

// Adiciona um interceptor para logar requisições
axios.interceptors.request.use(
  config => {
    console.log('Fazendo requisição para:', config.url);
    return config;
  },
  error => {
    console.error('Erro na requisição:', error);
    return Promise.reject(error);
  }
);

// Adiciona um interceptor para tratar erros
axios.interceptors.response.use(
  response => {
    console.log('Resposta recebida de:', response.config.url, response.data);
    return response;
  },
  error => {
    console.error('Erro na requisição:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default axios; 
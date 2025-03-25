import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Interceptor para respostas apenas para log de erros
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      console.error('Erro na resposta:', error.response.data)
      console.error('Status:', error.response.status)
    } else if (error.request) {
      console.error('Erro na requisição:', error.request)
    } else {
      console.error('Erro:', error.message)
    }
    return Promise.reject(error)
  }
)

export const clientesService = {
  listar: () => api.get('/api/v1/clientes'),
  obter: (id) => api.get(`/api/v1/clientes/${id}`),
  criar: (cliente) => api.post('/api/v1/clientes', cliente),
  atualizar: (id, cliente) => api.put(`/api/v1/clientes/${id}`, cliente),
  excluir: (id) => api.delete(`/api/v1/clientes/${id}`),
  buscarAgendamentos: (id) => api.get(`/api/v1/clientes/${id}/agendamentos`),
  excluirComAgendamentos: (id) => api.delete(`/api/v1/clientes/${id}/cascata`)
}

export const procedimentosService = {
  listar: () => api.get('/api/v1/procedimentos'),
  obter: (id) => api.get(`/api/v1/procedimentos/${id}`),
  criar: (procedimento) => api.post('/api/v1/procedimentos', procedimento),
  atualizar: (id, procedimento) => api.put(`/api/v1/procedimentos/${id}`, procedimento),
  excluir: (id) => api.delete(`/api/v1/procedimentos/${id}`)
}

export const funcionariosService = {
  listar: () => api.get('/api/v1/funcionarios'),
  obter: (id) => api.get(`/api/v1/funcionarios/${id}`),
  criar: (funcionario) => api.post('/api/v1/funcionarios', funcionario),
  atualizar: (id, funcionario) => api.put(`/api/v1/funcionarios/${id}`, funcionario),
  excluir: (id) => api.delete(`/api/v1/funcionarios/${id}`)
}

export const agendamentosService = {
  listar: () => api.get('/api/v1/agendamentos'),
  obter: (id) => api.get(`/api/v1/agendamentos/${id}`),
  criar: (agendamento) => api.post('/api/v1/agendamentos', agendamento),
  atualizar: (id, agendamento) => api.put(`/api/v1/agendamentos/${id}`, agendamento),
  excluir: (id) => api.delete(`/api/v1/agendamentos/${id}`),
  listarPorData: (data) => api.get(`/api/v1/agendamentos/date?data=${data}`)
}

export default api 
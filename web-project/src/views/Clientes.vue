<template>
  <div class="clientes">
    <div class="header">
      <h1>Clientes</h1>
      <button class="btn btn-primary" @click="showModal = true">
        <span class="material-icons">add</span>
        Novo Cliente
      </button>
    </div>

    <div class="search-bar">
      <div class="search-input">
        <span class="material-icons">search</span>
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Buscar clientes..."
          @input="filterClientes"
        >
      </div>
    </div>

    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Telefone</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cliente in filteredClientes" :key="cliente.id">
            <td>{{ cliente.nome }}</td>
            <td>{{ cliente.telefone }}</td>
            <td>{{ cliente.email }}</td>
            <td class="actions">
              <button class="btn-icon" @click="editarCliente(cliente)">
                <span class="material-icons">edit</span>
              </button>
              <button class="btn-icon" @click="confirmarExclusao(cliente)">
                <span class="material-icons">delete</span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal de Cliente -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <h2>{{ clienteSelecionado ? 'Editar Cliente' : 'Novo Cliente' }}</h2>
          <button class="btn-icon" @click="fecharModal">
            <span class="material-icons">close</span>
          </button>
        </div>
        <form @submit.prevent="salvarCliente">
          <div class="form-group">
            <label>Nome</label>
            <input type="text" v-model="form.nome" required>
          </div>
          <div class="form-group">
            <label>Telefone</label>
            <input type="tel" v-model="form.telefone" required>
          </div>
          <div class="form-group">
            <label>Email</label>
            <input type="email" v-model="form.email">
          </div>
          <div class="form-actions">
            <button type="button" class="btn btn-secondary" @click="fecharModal">Cancelar</button>
            <button type="submit" class="btn btn-primary">Salvar</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal de Confirmação -->
    <div v-if="showConfirmModal" class="modal">
      <div class="modal-content">
        <h2>Confirmar Exclusão</h2>
        <p>Tem certeza que deseja excluir este cliente?</p>
        
        <div v-if="agendamentosCliente.length > 0" class="agendamentos-warning">
          <p class="warning-text">
            <span class="material-icons">warning</span>
            Este cliente possui os seguintes agendamentos:
          </p>
          <ul class="agendamentos-list">
            <li v-for="agendamento in agendamentosCliente" :key="agendamento.id">
              {{ formatarDataHora(agendamento.data) }} - {{ agendamento.procedimento.nome }}
            </li>
          </ul>
          <p>Todos estes agendamentos serão excluídos junto com o cliente.</p>
        </div>

        <div class="form-actions">
          <button class="btn btn-secondary" @click="showConfirmModal = false">Cancelar</button>
          <button class="btn btn-danger" @click="excluirCliente">Confirmar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { clientesService } from '@/services/api'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

const clientes = ref([])
const filteredClientes = ref([])
const searchQuery = ref('')
const showModal = ref(false)
const showConfirmModal = ref(false)
const clienteSelecionado = ref(null)
const clienteParaExcluir = ref(null)
const agendamentosCliente = ref([])

const form = ref({
  nome: '',
  telefone: '',
  email: ''
})

const formatarDataHora = (data) => {
  return format(new Date(data), "dd 'de' MMMM 'às' HH:mm", { locale: ptBR })
}

const carregarClientes = async () => {
  try {
    const response = await clientesService.listar()
    clientes.value = response.data
    filteredClientes.value = response.data
  } catch (error) {
    console.error('Erro ao carregar clientes:', error)
  }
}

const filterClientes = () => {
  const query = searchQuery.value.toLowerCase()
  filteredClientes.value = clientes.value.filter(cliente => 
    cliente.nome.toLowerCase().includes(query) ||
    cliente.telefone.includes(query) ||
    cliente.email.toLowerCase().includes(query)
  )
}

const limparFormulario = () => {
  form.value = {
    nome: '',
    telefone: '',
    email: ''
  }
  clienteSelecionado.value = null
}

const fecharModal = () => {
  showModal.value = false
  limparFormulario()
}

const editarCliente = (cliente) => {
  clienteSelecionado.value = cliente
  form.value = { ...cliente }
  showModal.value = true
}

const confirmarExclusao = async (cliente) => {
  try {
    const response = await clientesService.buscarAgendamentos(cliente.id)
    agendamentosCliente.value = response.data
    clienteParaExcluir.value = cliente
    showConfirmModal.value = true
  } catch (error) {
    console.error('Erro ao buscar agendamentos:', error)
  }
}

const salvarCliente = async () => {
  try {
    if (clienteSelecionado.value) {
      await clientesService.atualizar(clienteSelecionado.value.id, form.value)
    } else {
      await clientesService.criar(form.value)
    }
    await carregarClientes()
    fecharModal()
  } catch (error) {
    console.error('Erro ao salvar cliente:', error)
  }
}

const excluirCliente = async () => {
  try {
    await clientesService.excluirComAgendamentos(clienteParaExcluir.value.id)
    await carregarClientes()
    showConfirmModal.value = false
    clienteParaExcluir.value = null
    agendamentosCliente.value = []
  } catch (error) {
    console.error('Erro ao excluir cliente:', error)
  }
}

onMounted(() => {
  carregarClientes()
})
</script>

<style lang="scss" scoped>
.clientes {
  padding: 2rem;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;

    h1 {
      color: var(--primary-color);
      margin: 0;
    }
  }

  .search-bar {
    margin-bottom: 2rem;

    .search-input {
      display: flex;
      align-items: center;
      background-color: white;
      border: 1px solid var(--border-color);
      border-radius: 4px;
      padding: 0.5rem 1rem;
      width: 100%;
      max-width: 400px;

      .material-icons {
        color: var(--text-color-secondary);
        margin-right: 0.5rem;
      }

      input {
        border: none;
        outline: none;
        width: 100%;
        font-size: 1rem;
      }
    }
  }

  .table-container {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    overflow: hidden;

    table {
      width: 100%;
      border-collapse: collapse;

      th, td {
        padding: 1rem;
        text-align: left;
        border-bottom: 1px solid var(--border-color);
      }

      th {
        background-color: var(--primary-color);
        color: white;
        font-weight: 500;
      }

      tr:hover {
        background-color: rgba(0, 0, 0, 0.02);
      }

      .actions {
        display: flex;
        gap: 0.5rem;
      }
    }
  }

  .modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;

    .modal-content {
      background-color: white;
      border-radius: 8px;
      padding: 2rem;
      width: 100%;
      max-width: 500px;

      .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;

        h2 {
          margin: 0;
          color: var(--primary-color);
        }
      }

      .form-group {
        margin-bottom: 1rem;

        label {
          display: block;
          margin-bottom: 0.5rem;
          color: var(--text-color);
        }

        input {
          width: 100%;
          padding: 0.5rem;
          border: 1px solid var(--border-color);
          border-radius: 4px;
          font-size: 1rem;

          &:focus {
            outline: none;
            border-color: var(--primary-color);
          }
        }
      }

      .form-actions {
        display: flex;
        justify-content: flex-end;
        gap: 1rem;
        margin-top: 1.5rem;
      }
    }
  }

  .agendamentos-warning {
    margin: 20px 0;
    padding: 15px;
    background: var(--warning-bg-color);
    border-radius: 4px;

    .warning-text {
      display: flex;
      align-items: center;
      gap: 10px;
      color: var(--warning-text-color);
      margin: 0 0 10px;

      .material-icons {
        color: var(--warning-color);
      }
    }

    .agendamentos-list {
      margin: 10px 0;
      padding-left: 20px;

      li {
        color: var(--text-color-light);
        margin: 5px 0;
      }
    }
  }
}
</style> 
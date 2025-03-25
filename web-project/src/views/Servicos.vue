<template>
  <div class="servicos">
    <div class="header">
      <h1>Serviços</h1>
      <button class="btn btn-primary" @click="showModal = true">
        <span class="material-icons">add</span>
        Novo Serviço
      </button>
    </div>

    <div class="search-bar">
      <div class="search-input">
        <span class="material-icons">search</span>
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Buscar serviços..."
          @input="filterServicos"
        >
      </div>
    </div>

    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Preço</th>
            <th>Duração</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="servico in filteredServicos" :key="servico.id">
            <td>{{ servico.nome }}</td>
            <td>{{ servico.descricao || '-' }}</td>
            <td>R$ {{ servico.preco?.toFixed(2) || '0,00' }}</td>
            <td>{{ servico.duracao || 0 }} min</td>
            <td class="actions">
              <button class="btn-icon" @click="editarServico(servico)" title="Editar">
                <span class="material-icons">edit</span>
              </button>
              <button class="btn-icon" @click="confirmarExclusao(servico)" title="Excluir">
                <span class="material-icons">delete</span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal de Serviço -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <h2>{{ servicoSelecionado ? 'Editar Serviço' : 'Novo Serviço' }}</h2>
          <button class="btn-icon" @click="fecharModal">
            <span class="material-icons">close</span>
          </button>
        </div>
        <form @submit.prevent="salvarServico">
          <div class="form-group">
            <label for="nome">Nome</label>
            <input 
              type="text" 
              id="nome"
              v-model="form.nome" 
              required
              placeholder="Nome do serviço"
            >
          </div>
          <div class="form-group">
            <label for="descricao">Descrição</label>
            <textarea 
              id="descricao"
              v-model="form.descricao" 
              rows="3"
              placeholder="Descrição do serviço"
            ></textarea>
          </div>
          <div class="form-group">
            <label for="preco">Preço (R$)</label>
            <input 
              type="number" 
              id="preco"
              v-model="form.preco" 
              step="0.01" 
              min="0"
              required
              placeholder="0,00"
            >
          </div>
          <div class="form-group">
            <label for="duracao">Duração (minutos)</label>
            <input 
              type="number" 
              id="duracao"
              v-model="form.duracao" 
              min="1"
              required
              placeholder="30"
            >
          </div>
          <div class="form-actions">
            <button type="button" class="btn btn-secondary" @click="fecharModal">
              Cancelar
            </button>
            <button type="submit" class="btn btn-primary">
              {{ servicoSelecionado ? 'Atualizar' : 'Criar' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal de Confirmação -->
    <div v-if="showConfirmModal" class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <h2>Confirmar Exclusão</h2>
          <button class="btn-icon" @click="showConfirmModal = false">
            <span class="material-icons">close</span>
          </button>
        </div>
        <p>Tem certeza que deseja excluir o serviço "{{ servicoParaExcluir?.nome }}"?</p>
        <div class="form-actions">
          <button class="btn btn-secondary" @click="showConfirmModal = false">
            Cancelar
          </button>
          <button class="btn btn-danger" @click="excluirServico">
            Confirmar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { procedimentosService } from '@/services/api'

const servicos = ref([])
const filteredServicos = ref([])
const searchQuery = ref('')
const showModal = ref(false)
const showConfirmModal = ref(false)
const servicoSelecionado = ref(null)
const servicoParaExcluir = ref(null)

const form = ref({
  nome: '',
  descricao: '',
  preco: 0,
  duracao: 30
})

const carregarServicos = async () => {
  try {
    const response = await procedimentosService.listar()
    servicos.value = response.data
    filteredServicos.value = response.data
  } catch (error) {
    console.error('Erro ao carregar serviços:', error)
  }
}

const filterServicos = () => {
  const query = searchQuery.value.toLowerCase()
  filteredServicos.value = servicos.value.filter(servico => 
    servico.nome.toLowerCase().includes(query) ||
    (servico.descricao && servico.descricao.toLowerCase().includes(query))
  )
}

const limparFormulario = () => {
  form.value = {
    nome: '',
    descricao: '',
    preco: 0,
    duracao: 30
  }
  servicoSelecionado.value = null
}

const fecharModal = () => {
  showModal.value = false
  limparFormulario()
}

const editarServico = (servico) => {
  servicoSelecionado.value = servico
  form.value = { ...servico }
  showModal.value = true
}

const confirmarExclusao = (servico) => {
  servicoParaExcluir.value = servico
  showConfirmModal.value = true
}

const salvarServico = async () => {
  try {
    if (servicoSelecionado.value) {
      await procedimentosService.atualizar(servicoSelecionado.value.id, form.value)
    } else {
      await procedimentosService.criar(form.value)
    }
    await carregarServicos()
    fecharModal()
  } catch (error) {
    console.error('Erro ao salvar serviço:', error)
  }
}

const excluirServico = async () => {
  try {
    await procedimentosService.excluir(servicoParaExcluir.value.id)
    await carregarServicos()
    showConfirmModal.value = false
  } catch (error) {
    console.error('Erro ao excluir serviço:', error)
  }
}

onMounted(() => {
  carregarServicos()
})
</script>

<style lang="scss" scoped>
.servicos {
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
        background-color: var(--background-color);
        font-weight: 600;
        color: var(--text-color);
      }

      td {
        color: var(--text-color);

        &.actions {
          display: flex;
          gap: 0.5rem;
        }
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
    justify-content: center;
    align-items: center;
    z-index: 1000;

    .modal-content {
      background-color: white;
      border-radius: 8px;
      padding: 2rem;
      width: 100%;
      max-width: 500px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

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
          font-weight: 500;
        }

        input, textarea {
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

        textarea {
          resize: vertical;
        }
      }

      .form-actions {
        display: flex;
        justify-content: flex-end;
        gap: 1rem;
        margin-top: 2rem;
      }
    }
  }

  .btn {
    padding: 0.5rem 1rem;
    border-radius: 4px;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    border: none;
    transition: all 0.2s ease;

    &.btn-primary {
      background-color: var(--primary-color);
      color: white;

      &:hover {
        background-color: var(--primary-color-dark);
      }
    }

    &.btn-secondary {
      background-color: var(--background-color);
      color: var(--text-color);

      &:hover {
        background-color: var(--border-color);
      }
    }

    &.btn-danger {
      background-color: var(--error-color);
      color: white;

      &:hover {
        background-color: var(--error-color-dark);
      }
    }
  }

  .btn-icon {
    background: none;
    border: none;
    padding: 0.25rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-color-secondary);
    transition: color 0.2s ease;

    &:hover {
      color: var(--primary-color);
    }

    .material-icons {
      font-size: 1.25rem;
    }
  }
}
</style> 
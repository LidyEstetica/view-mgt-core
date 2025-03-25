<template>
  <div class="servicos">
    <h2>Serviços</h2>

    <!-- Formulário de Novo Serviço -->
    <div class="novo-servico">
      <h3>Novo Serviço</h3>
      <form @submit.prevent="salvarServico">
        <div class="form-group">
          <label>Nome</label>
          <input type="text" v-model="novoServico.nome" required>
        </div>

        <div class="form-group">
          <label>Descrição</label>
          <textarea v-model="novoServico.descricao" rows="3"></textarea>
        </div>

        <div class="form-group">
          <label>Valor (R$)</label>
          <input type="number" v-model="novoServico.valor" step="0.01" min="0" required>
        </div>

        <div class="form-group">
          <label>Duração (minutos)</label>
          <input type="number" v-model="novoServico.duracaoMinutos" min="1" required>
        </div>

        <button type="submit" class="btn-salvar">Salvar</button>
      </form>
    </div>

    <!-- Lista de Serviços -->
    <div class="servicos-lista">
      <div v-for="servico in servicos" :key="servico.id" class="servico-card">
        <div class="servico-info">
          <h4>{{ servico.nome }}</h4>
          <p class="descricao">{{ servico.descricao }}</p>
          <div class="detalhes">
            <span class="valor">R$ {{ servico.valor.toFixed(2) }}</span>
            <span class="duracao">{{ servico.duracaoMinutos }} minutos</span>
          </div>
        </div>
        <div class="servico-actions">
          <button @click="editarServico(servico)" class="btn-edit">
            <span class="material-icons">edit</span>
          </button>
          <button @click="excluirServico(servico.id)" class="btn-delete">
            <span class="material-icons">delete</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const servicos = ref([]);
const novoServico = ref({
  nome: '',
  descricao: '',
  valor: 0,
  duracaoMinutos: 30
});

const carregarServicos = async () => {
  try {
    const response = await axios.get('/servicos');
    servicos.value = response.data;
  } catch (error) {
    console.error('Erro ao carregar serviços:', error);
  }
};

const salvarServico = async () => {
  try {
    await axios.post('/servicos', novoServico.value);
    
    // Limpa o formulário
    novoServico.value = {
      nome: '',
      descricao: '',
      valor: 0,
      duracaoMinutos: 30
    };
    
    // Recarrega a lista
    await carregarServicos();
  } catch (error) {
    console.error('Erro ao salvar serviço:', error);
  }
};

const editarServico = async (servico) => {
  try {
    await axios.put(`/servicos/${servico.id}`, servico);
    await carregarServicos();
  } catch (error) {
    console.error('Erro ao editar serviço:', error);
  }
};

const excluirServico = async (id) => {
  if (!confirm('Tem certeza que deseja excluir este serviço?')) return;
  
  try {
    await axios.delete(`/servicos/${id}`);
    await carregarServicos();
  } catch (error) {
    console.error('Erro ao excluir serviço:', error);
  }
};

onMounted(carregarServicos);
</script>

<style scoped lang="scss">
.servicos {
  padding: 20px;

  h2, h3 {
    color: var(--primary-color);
    margin-bottom: 20px;
  }

  .novo-servico {
    background: white;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 30px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    form {
      display: grid;
      gap: 20px;

      .form-group {
        label {
          display: block;
          margin-bottom: 8px;
          color: var(--text-color);
          font-weight: 500;
        }

        input, textarea {
          width: 100%;
          padding: 8px 12px;
          border: 1px solid var(--border-color);
          border-radius: 4px;
          font-size: 14px;

          &:focus {
            outline: none;
            border-color: var(--primary-color);
          }
        }
      }

      .btn-salvar {
        background: var(--primary-color);
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 4px;
        cursor: pointer;
        font-weight: 500;

        &:hover {
          background: var(--primary-color-dark);
        }
      }
    }
  }

  .servicos-lista {
    display: grid;
    gap: 15px;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));

    .servico-card {
      background: white;
      border-radius: 8px;
      padding: 20px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

      .servico-info {
        flex: 1;

        h4 {
          margin: 0 0 10px;
          color: var(--text-color);
        }

        .descricao {
          color: var(--text-color-light);
          margin-bottom: 10px;
        }

        .detalhes {
          display: flex;
          gap: 15px;
          font-size: 0.9em;

          .valor {
            color: var(--primary-color);
            font-weight: 500;
          }

          .duracao {
            color: var(--text-color-light);
          }
        }
      }

      .servico-actions {
        display: flex;
        gap: 10px;

        button {
          background: none;
          border: none;
          cursor: pointer;
          padding: 5px;
          border-radius: 4px;

          &.btn-edit {
            color: var(--primary-color);
          }

          &.btn-delete {
            color: var(--danger-color);
          }

          &:hover {
            background: rgba(0, 0, 0, 0.05);
          }
        }
      }
    }
  }
}
</style> 
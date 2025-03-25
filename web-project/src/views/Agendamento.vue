<template>
  <div class="agendamento">
    <h1>Agendamento</h1>
    <div class="container">
      <div class="card">
        <h2>Novo Agendamento</h2>
        <form @submit.prevent="criarAgendamento">
          <div class="form-group">
            <label for="cliente">Cliente</label>
            <select id="cliente" v-model="novoAgendamento.idCliente" required>
              <option value="">Selecione um cliente</option>
              <option v-for="cliente in clientes" :key="cliente.id" :value="cliente.id">
                {{ cliente.nome }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label for="funcionario">Funcionário</label>
            <select id="funcionario" v-model="novoAgendamento.idFuncionario" required>
              <option value="">Selecione um funcionário</option>
              <option v-for="funcionario in funcionarios" :key="funcionario.id" :value="funcionario.id">
                {{ funcionario.nome }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label for="procedimento">Procedimento</label>
            <select id="procedimento" v-model="novoAgendamento.idProcedimento" required>
              <option value="">Selecione um procedimento</option>
              <option v-for="procedimento in procedimentos" :key="procedimento.id" :value="procedimento.id">
                {{ procedimento.nome }} - {{ procedimento.preco ? `R$ ${procedimento.preco.toFixed(2)}` : 'Preço não definido' }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label for="data">Data</label>
            <input type="date" id="data" v-model="novoAgendamento.data" required>
          </div>

          <div class="form-group">
            <label for="hora">Hora</label>
            <input type="time" id="hora" v-model="novoAgendamento.hora" required>
          </div>

          <button type="submit" class="btn btn-primary">
            <span class="material-icons">event_available</span>
            Agendar
          </button>
        </form>
      </div>

      <div class="card">
        <h2>Agendamentos do Dia</h2>
        <div v-if="agendamentosDoDia.length === 0" class="sem-agendamentos">
          <p>Nenhum agendamento para esta data.</p>
        </div>
        <div v-else class="agendamentos-lista">
          <div v-for="agendamento in agendamentosDoDia" :key="agendamento.id" class="agendamento-item">
            <div class="agendamento-info">
              <h3>{{ agendamento.cliente?.nome || 'Cliente não encontrado' }}</h3>
              <p>{{ agendamento.procedimento?.nome || 'Procedimento não encontrado' }}</p>
              <p>{{ agendamento.funcionario?.nome || 'Funcionário não encontrado' }}</p>
              <p>{{ formatarHora(agendamento.dataHora) }}</p>
            </div>
            <div class="agendamento-acoes">
              <button class="btn btn-danger" @click="cancelarAgendamento(agendamento.id)">
                <span class="material-icons">cancel</span>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { clientesService, procedimentosService, funcionariosService, agendamentosService } from '@/services/api';

const clientes = ref([]);
const funcionarios = ref([]);
const procedimentos = ref([]);
const agendamentosDoDia = ref([]);

const novoAgendamento = ref({
  idCliente: '',
  idFuncionario: '',
  idProcedimento: '',
  data: '',
  hora: ''
});

const carregarClientes = async () => {
  try {
    const response = await clientesService.listar();
    clientes.value = response.data;
  } catch (error) {
    console.error('Erro ao carregar clientes:', error);
  }
};

const carregarFuncionarios = async () => {
  try {
    const response = await funcionariosService.listar();
    funcionarios.value = response.data;
  } catch (error) {
    console.error('Erro ao carregar funcionários:', error);
  }
};

const carregarProcedimentos = async () => {
  try {
    const response = await procedimentosService.listar();
    procedimentos.value = response.data;
  } catch (error) {
    console.error('Erro ao carregar procedimentos:', error);
  }
};

const carregarAgendamentosDoDia = async () => {
  if (!novoAgendamento.value.data) return;
  
  try {
    const response = await agendamentosService.listarPorData(novoAgendamento.value.data);
    agendamentosDoDia.value = response.data;
  } catch (error) {
    console.error('Erro ao carregar agendamentos:', error);
  }
};

const criarAgendamento = async () => {
  try {
    const dataHora = `${novoAgendamento.value.data}T${novoAgendamento.value.hora}:00`;
    const dataAgendamento = new Date(dataHora);
    const agora = new Date();
    
    // Resetar segundos e milissegundos para comparação mais justa
    dataAgendamento.setSeconds(0, 0);
    agora.setSeconds(0, 0);
    
    // Verificar se a data selecionada está no passado
    if (dataAgendamento < agora) {
      alert("Não é possível agendar para uma data e hora no passado.");
      return;
    }
    
    await agendamentosService.criar({
      idCliente: parseInt(novoAgendamento.value.idCliente),
      idFuncionario: parseInt(novoAgendamento.value.idFuncionario),
      idProcedimento: parseInt(novoAgendamento.value.idProcedimento),
      quantidadeProcedimento: 1,
      data: dataHora,
      observacoes: ''
    });

    // Limpar formulário
    novoAgendamento.value = {
      idCliente: '',
      idFuncionario: '',
      idProcedimento: '',
      data: novoAgendamento.value.data, // Mantém a data para continuar mostrando agendamentos do dia
      hora: ''
    };

    // Recarregar agendamentos
    await carregarAgendamentosDoDia();
  } catch (error) {
    console.error('Erro ao criar agendamento:', error);
    if (error.response && error.response.data) {
      alert(`Erro: ${error.response.data.message}`);
    } else {
      alert('Erro ao criar agendamento. Por favor, tente novamente.');
    }
  }
};

const cancelarAgendamento = async (id) => {
  if (!confirm('Tem certeza que deseja cancelar este agendamento?')) return;

  try {
    await agendamentosService.excluir(id);
    await carregarAgendamentosDoDia();
  } catch (error) {
    console.error('Erro ao cancelar agendamento:', error);
    alert('Erro ao cancelar agendamento. Por favor, tente novamente.');
  }
};

const formatarHora = (dataHora) => {
  if (!dataHora) return '';
  const data = new Date(dataHora);
  return data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
};

// Carregar dados iniciais
onMounted(async () => {
  await Promise.all([
    carregarClientes(),
    carregarFuncionarios(),
    carregarProcedimentos()
  ]);
  
  // Define a data inicial como hoje
  const hoje = new Date().toISOString().split('T')[0];
  novoAgendamento.value.data = hoje;
  await carregarAgendamentosDoDia();
});

// Observar mudanças na data para recarregar agendamentos
watch(() => novoAgendamento.value.data, carregarAgendamentosDoDia);
</script>

<style lang="scss" scoped>
.agendamento {
  padding: 2rem;

  h1 {
    color: var(--primary-color);
    margin-bottom: 2rem;
    font-size: 2rem;
  }

  .container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }

  .card {
    background: white;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    h2 {
      color: var(--primary-color);
      margin-bottom: 1.5rem;
      font-size: 1.5rem;
    }
  }

  .form-group {
    margin-bottom: 1.5rem;

    label {
      display: block;
      margin-bottom: 0.5rem;
      color: var(--text-color);
      font-weight: 500;
    }

    select, input {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid var(--border-color);
      border-radius: 8px;
      font-size: 1rem;
      background-color: white;
      transition: border-color 0.3s ease;

      &:focus {
        outline: none;
        border-color: var(--primary-color);
      }
    }
  }

  .btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;

    .material-icons {
      font-size: 1.25rem;
    }

    &.btn-primary {
      background-color: var(--primary-color);
      color: white;

      &:hover {
        background-color: var(--primary-color-dark);
      }
    }

    &.btn-danger {
      background-color: var(--danger-color);
      color: white;

      &:hover {
        filter: brightness(90%);
      }
    }
  }

  .agendamentos-lista {
    .agendamento-item {
      border-bottom: 1px solid var(--border-color);
      padding: 1rem 0;
      display: flex;
      justify-content: space-between;
      align-items: center;

      &:last-child {
        border-bottom: none;
      }

      .agendamento-info {
        h3 {
          margin: 0;
          color: var(--text-color);
          font-size: 1.1rem;
        }

        p {
          margin: 0.25rem 0;
          color: var(--text-color-light);
        }
      }

      .agendamento-acoes {
        display: flex;
        gap: 0.5rem;
      }
    }
  }

  .sem-agendamentos {
    text-align: center;
    padding: 2rem;
    color: var(--text-color-light);
    font-style: italic;
  }
}

@media (max-width: 768px) {
  .agendamento {
    padding: 1rem;

    .container {
      grid-template-columns: 1fr;
    }
  }
}
</style> 
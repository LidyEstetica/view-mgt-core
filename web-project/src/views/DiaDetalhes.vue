<template>
  <div class="dia-detalhes">
    <div class="container">
      <div class="header">
        <h1>Agenda do Dia</h1>
        <div class="data-info">
          <h2>{{ formatarData(data) }}</h2>
        </div>
      </div>

      <div class="card">
        <div class="horarios-grid">
          <div v-for="horario in horarios" :key="horario.hora" class="horario-item">
            <div class="horario-header">
              <span class="hora">{{ horario.hora }}</span>
              <span class="status" :class="horario.status">{{ horario.status }}</span>
            </div>

            <div v-if="horario.agendamento" class="agendamento-info">
              <h3>{{ horario.agendamento.clienteNome }}</h3>
              <p>{{ horario.agendamento.servicoNome }}</p>
              <div class="acoes">
                <button class="btn btn-secondary" @click="editarAgendamento(horario.agendamento)">
                  Editar
                </button>
                <button class="btn btn-danger" @click="cancelarAgendamento(horario.agendamento.id)">
                  Cancelar
                </button>
              </div>
            </div>

            <div v-else class="horario-vazio">
              <button class="btn btn-primary" @click="novoAgendamento(horario.hora)">
                Novo Agendamento
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const data = ref(route.params.id || new Date().toISOString().split('T')[0])

// Dados mockados (substituir por dados reais posteriormente)
const agendamentos = ref([
  {
    id: 1,
    clienteNome: 'Cliente 1',
    servicoNome: 'Serviço 1',
    data: '2024-03-18',
    hora: '10:00'
  }
])

// Gerar horários do dia
const horarios = computed(() => {
  const horariosList = []
  const inicio = 8
  const fim = 18

  for (let hora = inicio; hora < fim; hora++) {
    const horarioStr = `${hora.toString().padStart(2, '0')}:00`
    const agendamento = agendamentos.value.find(
      a => a.data === data.value && a.hora === horarioStr
    )

    horariosList.push({
      hora: horarioStr,
      status: agendamento ? 'ocupado' : 'disponível',
      agendamento
    })
  }

  return horariosList
})

// Métodos
const formatarData = (dataStr) => {
  const data = new Date(dataStr)
  return data.toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const novoAgendamento = (hora) => {
  // Implementar lógica de novo agendamento
}

const editarAgendamento = (agendamento) => {
  // Implementar lógica de edição
}

const cancelarAgendamento = (id) => {
  agendamentos.value = agendamentos.value.filter(a => a.id !== id)
}
</script>

<style lang="scss" scoped>
.dia-detalhes {
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;

    h1 {
      color: $primary-color;
    }

    .data-info h2 {
      color: $secondary-color;
    }
  }

  .horarios-grid {
    display: grid;
    gap: 1rem;
  }

  .horario-item {
    border: 1px solid #eee;
    border-radius: 4px;
    overflow: hidden;

    .horario-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem 1rem;
      background-color: #f8f9fa;

      .hora {
        font-weight: bold;
        color: $primary-color;
      }

      .status {
        font-size: 0.9rem;
        padding: 0.25rem 0.5rem;
        border-radius: 4px;

        &.disponível {
          background-color: $success-color;
          color: white;
        }

        &.ocupado {
          background-color: $danger-color;
          color: white;
        }
      }
    }

    .agendamento-info {
      padding: 1rem;

      h3 {
        margin-bottom: 0.5rem;
        color: $primary-color;
      }

      p {
        color: $secondary-color;
        margin-bottom: 1rem;
      }

      .acoes {
        display: flex;
        gap: 0.5rem;
      }
    }

    .horario-vazio {
      padding: 1rem;
      text-align: center;
    }
  }
}
</style> 
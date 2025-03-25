<template>
  <div class="lembretes">
    <h2>Lembretes</h2>
    <div class="lembretes-list">
      <div v-for="lembrete in lembretes" :key="lembrete.id" class="lembrete-card">
        <div class="lembrete-header">
          <span class="material-icons">notification_important</span>
          <h3>{{ lembrete.titulo }}</h3>
        </div>
        <p>{{ lembrete.mensagem }}</p>
        <div class="lembrete-footer">
          <span class="data">{{ formatarData(lembrete.data) }}</span>
          <button @click="removerLembrete(lembrete.id)" class="btn-remover">
            <span class="material-icons">delete</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const lembretes = ref([]);

onMounted(() => {
  const lembretesStorage = localStorage.getItem('lembretes');
  if (lembretesStorage) {
    lembretes.value = JSON.parse(lembretesStorage);
  }
});

const formatarData = (data) => {
  return format(new Date(data), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
};

const removerLembrete = (id) => {
  lembretes.value = lembretes.value.filter(lembrete => lembrete.id !== id);
  localStorage.setItem('lembretes', JSON.stringify(lembretes.value));
};

// Função para adicionar novo lembrete (será exportada)
const adicionarLembrete = (titulo, mensagem) => {
  const novoLembrete = {
    id: Date.now(),
    titulo,
    mensagem,
    data: new Date().toISOString()
  };
  lembretes.value.push(novoLembrete);
  localStorage.setItem('lembretes', JSON.stringify(lembretes.value));
};

defineExpose({ adicionarLembrete });
</script>

<style scoped lang="scss">
.lembretes {
  padding: 20px;

  h2 {
    color: var(--primary-color);
    margin-bottom: 20px;
  }

  .lembretes-list {
    display: grid;
    gap: 20px;
  }

  .lembrete-card {
    background: white;
    border-radius: 8px;
    padding: 15px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    .lembrete-header {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 10px;

      .material-icons {
        color: var(--primary-color);
      }

      h3 {
        margin: 0;
        color: var(--text-color);
      }
    }

    p {
      color: var(--text-color-light);
      margin-bottom: 15px;
    }

    .lembrete-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .data {
        font-size: 0.9em;
        color: var(--text-color-light);
      }

      .btn-remover {
        background: none;
        border: none;
        color: var(--danger-color);
        cursor: pointer;
        padding: 5px;

        &:hover {
          opacity: 0.8;
        }
      }
    }
  }
}
</style> 
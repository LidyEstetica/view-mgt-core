<template>
  <div class="inicio">
    <h1>Bem-vindo ao Sistema de Agendamentos</h1>
    <div class="cards">
      <router-link to="/agendamento" class="card">
        <span class="material-icons">event</span>
        <h2>Agendamentos</h2>
        <p>Gerencie os agendamentos do dia</p>
      </router-link>

      <router-link to="/clientes" class="card">
        <span class="material-icons">people</span>
        <h2>Clientes</h2>
        <p>Cadastre e gerencie clientes</p>
      </router-link>

      <router-link to="/servicos" class="card">
        <span class="material-icons">spa</span>
        <h2>Serviços</h2>
        <p>Configure os serviços oferecidos</p>
      </router-link>
    </div>
  </div>
</template>

<style scoped lang="scss">
.inicio {
  padding: 40px;
  text-align: center;

  h1 {
    color: var(--primary-color);
    margin-bottom: 40px;
  }

  .cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 30px;
    max-width: 1200px;
    margin: 0 auto;

    .card {
      background: white;
      padding: 30px;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      text-decoration: none;
      transition: transform 0.2s;
      display: flex;
      flex-direction: column;
      align-items: center;

      &:hover {
        transform: translateY(-5px);
      }

      .material-icons {
        font-size: 48px;
        color: var(--primary-color);
        margin-bottom: 20px;
      }

      h2 {
        color: var(--text-color);
        margin-bottom: 10px;
      }

      p {
        color: var(--text-color-light);
        margin: 0;
      }
    }
  }
}
</style> 
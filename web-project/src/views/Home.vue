<template>
  <div class="home">
    <div class="hero">
      <h1>Bem-vindo ao Lidy</h1>
      <p>Sistema de gerenciamento para estética</p>
    </div>

    <div class="container">
      <div class="grid grid-3">
        <div class="card">
          <div class="card-icon">
            <span class="material-icons">calendar_today</span>
          </div>
          <h2>Agendamentos</h2>
          <p>Gerencie seus horários e compromissos</p>
          <router-link to="/agendamento" class="btn btn-primary">Ver Agendamentos</router-link>
        </div>

        <div class="card">
          <div class="card-icon">
            <span class="material-icons">people</span>
          </div>
          <h2>Clientes</h2>
          <p>Cadastre e gerencie seus clientes</p>
          <router-link to="/clientes" class="btn btn-primary">Ver Clientes</router-link>
        </div>

        <div class="card">
          <div class="card-icon">
            <span class="material-icons">spa</span>
          </div>
          <h2>Serviços</h2>
          <p>Controle seus serviços e preços</p>
          <router-link to="/servicos" class="btn btn-primary">Ver Serviços</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Componente principal da aplicação
</script>

<style lang="scss" scoped>
@use "@/styles/variables" as *;

.home {
  .hero {
    background: linear-gradient(135deg, $primary-color, darken-color($primary-color, 20%));
    color: white;
    padding: 4rem 2rem;
    text-align: center;
    margin-bottom: 2rem;
    border-radius: 8px;

    h1 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }

    p {
      font-size: 1.2rem;
      opacity: 0.9;
    }
  }

  .card {
    text-align: center;
    padding: 2rem;
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
    }

    .card-icon {
      font-size: 3rem;
      color: $primary-color;
      margin-bottom: 1rem;
    }

    h2 {
      margin-bottom: 1rem;
      color: $primary-color;
    }

    p {
      margin-bottom: 1.5rem;
      color: $secondary-color;
    }
  }
}
</style> 
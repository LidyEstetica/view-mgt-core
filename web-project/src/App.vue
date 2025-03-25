<template>
  <div class="app">
    <nav class="sidebar">
      <div class="logo">
        <span class="material-icons">spa</span>
        <h1>Lidy</h1>
      </div>
      <router-link to="/" class="nav-item">
        <span class="material-icons">home</span>
        <span>Início</span>
      </router-link>
      <router-link to="/agendamento" class="nav-item">
        <span class="material-icons">event</span>
        <span>Agendamento</span>
      </router-link>
      <router-link to="/clientes" class="nav-item">
        <span class="material-icons">people</span>
        <span>Clientes</span>
      </router-link>
      <router-link to="/servicos" class="nav-item">
        <span class="material-icons">spa</span>
        <span>Serviços</span>
      </router-link>
    </nav>
    <main class="content">
      <router-view></router-view>
    </main>
  </div>
</template>

<style lang="scss">
// Importa os ícones do Material Design e a fonte Roboto
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');

// Reset básico
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  height: 100%;
  width: 100%;
  font-family: 'Roboto', sans-serif;
  background-color: var(--background-color);
}

// Variáveis CSS
:root {
  --primary-color: #FF69B4;
  --primary-color-dark: #FF1493;
  --secondary-color: #FFB6C1;
  --text-color: #4A4A4A;
  --text-color-light: #666666;
  --background-color: #F8F9FA;
  --border-color: #E9ECEF;
  --success-color: #28A745;
  --error-color: #DC3545;
  --warning-color: #FFC107;
}

// Layout principal
.app {
  min-height: 100vh;
  display: flex;
  background-color: var(--background-color);
}

// Sidebar
.sidebar {
  width: 250px;
  background: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  position: fixed;
  height: 100vh;
  left: 0;
  top: 0;

  .logo {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 20px 0;
    margin-bottom: 20px;
    border-bottom: 1px solid var(--border-color);

    .material-icons {
      font-size: 32px;
      color: var(--primary-color);
    }

    h1 {
      color: var(--primary-color);
      font-size: 24px;
      font-weight: 600;
      margin: 0;
    }
  }

  .nav-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px;
    color: var(--text-color);
    text-decoration: none;
    border-radius: 8px;
    margin-bottom: 5px;
    transition: all 0.2s ease;

    .material-icons {
      font-size: 20px;
    }

    &:hover {
      background-color: rgba(255, 105, 180, 0.1);
    }

    &.router-link-active {
      background-color: var(--primary-color);
      color: white;
    }
  }
}

// Conteúdo principal
.content {
  flex: 1;
  margin-left: 250px;
  padding: 20px;
  background-color: var(--background-color);
  min-height: 100vh;
}

// Estilos globais de componentes
.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease;
  font-size: 14px;

  &.btn-primary {
    background-color: var(--primary-color);
    color: white;

    &:hover {
      background-color: var(--primary-color-dark);
    }
  }

  &.btn-danger {
    background-color: var(--error-color);
    color: white;

    &:hover {
      filter: brightness(90%);
    }
  }
}

.form-group {
  margin-bottom: 16px;

  label {
    display: block;
    margin-bottom: 8px;
    color: var(--text-color);
    font-weight: 500;
  }

  input,
  select {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    font-size: 14px;
    color: var(--text-color);
    background-color: white;

    &:focus {
      outline: none;
      border-color: var(--primary-color);
    }
  }
}

// Grid system
.grid-2 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

// Responsividade
@media (max-width: 768px) {
  .sidebar {
    width: 70px;
    padding: 10px;

    .logo h1,
    .nav-item span:not(.material-icons) {
      display: none;
    }
  }

  .content {
    margin-left: 70px;
  }

  .grid-2 {
    grid-template-columns: 1fr;
  }
}
</style> 
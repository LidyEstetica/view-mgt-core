<template>
  <aside class="sidebar" :class="{ 'sidebar-collapsed': isCollapsed }">
    <div class="sidebar-header">
      <span class="material-icons logo-icon" v-if="!isCollapsed">spa</span>
      <button class="toggle-btn" @click="toggleSidebar">
        <span class="material-icons">{{ isCollapsed ? 'chevron_right' : 'chevron_left' }}</span>
      </button>
    </div>

    <nav class="sidebar-nav">
      <router-link to="/" class="nav-item" active-class="active">
        <span class="material-icons">home</span>
        <span class="nav-text" v-if="!isCollapsed">Início</span>
      </router-link>

      <router-link to="/agendamento" class="nav-item" active-class="active">
        <span class="material-icons">calendar_today</span>
        <span class="nav-text" v-if="!isCollapsed">Agendamento</span>
      </router-link>

      <router-link to="/clientes" class="nav-item" active-class="active">
        <span class="material-icons">people</span>
        <span class="nav-text" v-if="!isCollapsed">Clientes</span>
      </router-link>

      <router-link to="/servicos" class="nav-item" active-class="active">
        <span class="material-icons">spa</span>
        <span class="nav-text" v-if="!isCollapsed">Serviços</span>
      </router-link>
    </nav>
  </aside>
</template>

<script setup>
import { ref } from 'vue'

const isCollapsed = ref(false)

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
}
</script>

<style lang="scss" scoped>
@use "@/styles/variables" as *;

.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: $sidebar-width;
  background-color: $primary-color;
  color: white;
  transition: width 0.3s ease;
  z-index: 1000;

  &-collapsed {
    width: $sidebar-collapsed-width;
  }

  .sidebar-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);

    .logo-icon {
      font-size: 2rem;
      color: white;
    }

    .toggle-btn {
      background: none;
      border: none;
      color: white;
      cursor: pointer;
      padding: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
        border-radius: 4px;
      }
    }
  }

  .sidebar-nav {
    padding: 1rem 0;

    .nav-item {
      display: flex;
      align-items: center;
      padding: 0.75rem 1rem;
      color: white;
      text-decoration: none;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }

      &.active {
        background-color: rgba(255, 255, 255, 0.2);
      }

      .material-icons {
        margin-right: 1rem;
        font-size: 24px;
      }

      .nav-text {
        font-size: 1rem;
      }
    }
  }
}
</style> 
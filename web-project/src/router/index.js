import { createRouter, createWebHistory } from 'vue-router';
import Inicio from '../views/Inicio.vue';
import Agendamento from '../views/Agendamento.vue';
import Clientes from '../views/Clientes.vue';
import Servicos from '../views/Servicos.vue';

const routes = [
  {
    path: '/',
    name: 'Inicio',
    component: Inicio
  },
  {
    path: '/agendamento',
    name: 'Agendamento',
    component: Agendamento
  },
  {
    path: '/clientes',
    name: 'Clientes',
    component: Clientes
  },
  {
    path: '/servicos',
    name: 'Servicos',
    component: Servicos
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router; 
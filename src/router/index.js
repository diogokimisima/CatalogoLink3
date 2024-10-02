import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Carrinho from '../pages/Carrinho.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/carrinho', component: Carrinho },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

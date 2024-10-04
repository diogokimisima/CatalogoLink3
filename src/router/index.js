import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Carrinho from '../pages/Carrinho.vue'
import Favoritos from '../pages/Favoritos.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/carrinho', component: Carrinho },
  { path: '/favoritos', component: Favoritos },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

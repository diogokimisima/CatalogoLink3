<template>
  <div
    class="menu menu-horizontal bg-slate-200 w-full justify-evenly items-center pt-[3px] pb-0.5 border-t border-gray-400"
  >
    <div>
      <button class="tooltip flex flex-col items-center" @click="toggleSidebar">
        <Menu class="w-7 h-7" />
        <p>Menu</p>
      </button>
    </div>

    <div class="flex flex-col items-center relative">
      <div
        v-if="$route.path === '/'"
        class="absolute top-0 bg-black h-0.5 w-[70px] -mt-[4px]"
      />
      <router-link to="/" class="tooltip flex flex-col items-center">
        <BookImage
          :class="['w-7 h-7', { 'text-black text-opacity-50': $route.path !== '/' }]"
        />
        <p :class="{ 'text-black text-opacity-50': $route.path !== '/' }">Catálogo</p>
      </router-link>
    </div>

    <div class="flex flex-col items-center relative">
      <div
        v-if="$route.path === '/carrinho'"
        class="absolute top-0 bg-black h-0.5 w-[70px] -mt-[4px]"
      />
      <router-link to="/carrinho" class="tooltip flex flex-col items-center">
        <ShoppingCart
          :class="[
            'w-7 h-7',
            { 'text-black text-opacity-50': $route.path !== '/carrinho' },
          ]"
        />
        <span
          :class="[
            'absolute -top-1 right-1 bg-red-600 rounded-full text-white text-xs px-1',
            { 'bg-opacity-80': $route.path !== '/carrinho' },
          ]"
          v-if="$store.getters.cartItemsCount > 0"
        >
          {{ $store.getters.cartItemsCount }}
        </span>
        <p :class="{ 'text-black text-opacity-50': $route.path !== '/carrinho' }">
          Carrinho
        </p>
      </router-link>
    </div>
    <div class="flex flex-col items-center relative">
      <div
        v-if="$route.path === '/favoritos'"
        class="absolute top-0 bg-black h-0.5 w-[70px] -mt-[4px]"
      />
      <router-link to="/favoritos" class="tooltip flex flex-col items-center">
        <img
          v-if="$route.path !== '/favoritos'"
          class="w-7 h-7"
          :src="FavoritosTransparente"
          alt="Favoritos"
        />
        <img v-else class="w-7 h-7" :src="Favoritos" alt="Favoritos" />
        <span
          :class="[
            'absolute -top-1 right-1 bg-red-600 rounded-full text-white text-xs px-1',
            { 'bg-opacity-80': $route.path !== '/favoritos' },
          ]"
          v-if="$store.getters.favoritesItemsCount > 0"
        >
          {{ $store.getters.favoritesItemsCount }}
        </span>
        <p :class="{ 'text-black text-opacity-50 ': $route.path !== '/favoritos' }">
          Favoritos
        </p>
      </router-link>
    </div>
    <div class="flex flex-col items-center">
      <a :href="whatsAppLink" class="tooltip flex flex-col items-center" target="_blank">
        <img class="w-7 h-7" :src="whatsIcon" alt="WhatsApp Icon" />
        <p>Whats</p>
      </a>
    </div>
  </div>

  <footer class="bg-blue-950 flex justify-center items-center h-6">
    <a href="https://trovata.com.br/" target="_blank">
      <img class="w-28 h-28 object-contain" :src="LogoTrovata" alt="logo trovata" />
    </a>
  </footer>
</template>

<script setup>
import { ShoppingCart, BookImage, Menu } from "lucide-vue-next";
import LogoTrovata from "../../assets/images/logo.png";
import Favoritos from "../../assets/images/favorite-toolbar.svg";
import FavoritosTransparente from "../../assets/images/favorite-toolbar-transparente.svg";
import whatsIcon from "../../assets/images/whats.svg";

const phoneNumber = "5511948256352";
const whatsAppLink = `https://wa.me/${phoneNumber}`;

const props = defineProps({
  toggleSidebar: Function,
});
</script>

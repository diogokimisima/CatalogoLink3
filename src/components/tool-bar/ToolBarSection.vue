<template>
  <div
    class="menu menu-horizontal bg-slate-200 w-full justify-evenly items-center pt-1 pb-0.5"
  >
    <div>
      <button class="tooltip flex flex-col items-center" @click="toggleSidebar">
        <Menu class="w-7 h-7" />
        <p>Menu</p>
      </button>
    </div>
    <div class="flex flex-col items-center">
      <router-link to="/" class="tooltip flex flex-col items-center">
        <BookImage class="w-7 h-7" />
        <p>Catálogo</p>
      </router-link>
    </div>
    <div>
      <router-link to="/carrinho" class="tooltip flex flex-col items-center">
        <ShoppingCart class="w-7 h-7" />
        <span
          class="absolute -top-1 right-1 bg-red-500 rounded-full text-white text-xs px-1"
          v-if="$store.getters.cartItems.length > 0"
        >
          {{ $store.getters.cartItems.length }}
        </span>
        <p class="">Carrinho</p>
      </router-link>
    </div>
    <div class="flex flex-col items-center">
      <a :href="whatsAppLink" class="tooltip flex flex-col items-center" target="_blank">
        <img class="w-7 h-7" :src="whatsIcon" alt="WhatsApp Icon" />
        <p>Whats</p>
      </a>
    </div>
  </div>

  <div class="bg-blue-950 flex justify-center items-center h-6">
    <a href="https://trovata.com.br/" target="_blank">
      <img class="w-28 h-28 object-contain" :src="LogoTrovata" alt="logo trovata" />
    </a>
  </div>
</template>

<script setup>
import { ShoppingCart, BookImage, Menu } from "lucide-vue-next";
import whatsIcon from "../../assets/images/whats.svg";
import LogoTrovata from "../../assets/images/logo.png";

const phoneNumber = "5511948256352";
const whatsAppLink = `https://wa.me/${phoneNumber}`;

const props = defineProps({
  toggleSidebar: Function,
});
</script>

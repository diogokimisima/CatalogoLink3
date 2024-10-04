<template>
  <FavoritosHeader />

  <div class="flex flex-col justify-center items-center mt-5">
    <FavoritosVazio v-if="favoritos.length === 0" />
    <div class="px-1 w-full">
      <ul v-if="favoritos.length !== 0" class="mb-24 flex flex-row flex-wrap justify-center gap-x-3 gap-y-5">
        <FavoritosItem
          v-for="(item, index) in favoritos"
          :key="item.codigoProduto"
          :item="item"
          :index="index"
          @remove-favorite="removeFavorite"
        />
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";

import FavoritosVazio from "../components/carrinho/FavoritosVazio.vue";
import FavoritosHeader from "../components/carrinho/FavoritosHeader.vue";
import FavoritosItem from "../components/carrinho/FavoritosItem.vue";

const store = useStore();

const favoritos = computed(() => store.getters.favoritesItems);

const removeFavorite = (codigoProduto) => {
  store.dispatch('removeFavorite', codigoProduto);
};


</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s, opacity 0.5s;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.slide-enter-to,
.slide-leave-from {
  opacity: 1;
  transform: translateX(0);
}
</style>

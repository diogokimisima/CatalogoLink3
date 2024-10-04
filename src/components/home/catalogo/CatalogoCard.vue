<!-- ProductCard.vue -->
<template>
  <button
    @click="showModal(item)"
    :class="[
      'w-80 bg-base-100 shadow-xl mx-auto my-4 rounded-2xl',
      { 'mb-0': isLastCard },
    ]"
  >
    <figure class="flex items-center justify-center relative">
      <img :src="item.imagem" :alt="'Image ' + item.id" />
      <img :src="item.lancamento" class="absolute left-2 top-10 w-24" v-if="item.lancamento" />
      <img
        class="absolute right-3 top-3"
        :src="getFavoriteImageSrc(item)"
        alt="logo favorito"
        @click.stop="addToFavorites(item)"
      />
    </figure>

    <div class="flex items-center justify-center py-5">
      <div class="flex flex-col flex-grow px-4">
        <h2 class="font-bold text-base text-left">
          {{ item.title }}
        </h2>
        <h3 class="font-normal text-base text-left">{{ item.id_produto }}</h3>
      </div>

      <div class="flex flex-col ml-auto px-4">
        <h3 class="text-base text-gray-400 whitespace-nowrap" v-if="item.valor_antigo">
          <span class="text-emerald-600 mr-1">
            {{ formatPercentage(item.valor_antigo, item.valor) }}% off
          </span>
          <span class="line-through"> R${{ formatPrice(item.valor_antigo) }} </span>
        </h3>
        <h4 class="whitespace-nowrap text-lg text-right font-semibold">
          R${{ formatPrice(item.valor) }}
        </h4>
      </div>
    </div>
  </button>
</template>

<script setup>
import { formatPrice, formatPercentage } from "../../../utils/formatarValores.js";

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  isLastCard: {
    type: Boolean,
    default: false,
  },
  getFavoriteImageSrc: {
    type: Function,
    required: true,
  },
});

const emit = defineEmits(["showModal", "add-to-favorites"]);

const showModal = (item) => {
  emit("showModal", item);
};

const addToFavorites = (item) => {
  emit("add-to-favorites", item);
};
</script>

<template>
  <li v-motion-fade-visible class="px-2 py-2 w-[165px] rounded-md shadow-md shadow-neutral-400">
    <div class="flex flex-col justify-between gap-y-2 h-full">
      <div class="">
        <img
          :src="item.imagem"
          :alt="'Imagem ' + item.numeroItem"
          class="w-[165px] h-[165px] object-contain mr-4 relative"
        />
        <button class="absolute top-3 right-3" @click.stop="removeFavorite">
          <img class="w-5 h-5" :src="favorite2" alt="imagem favorito" />
        </button>
      </div>
      <h2 class="text-[14px]">
        <span class="font-bold">{{ index + 1 }} - {{ item.nomeProduto }}</span>
      </h2>

      <p class="text-[14px]">({{ item.codigoProduto }})</p>

      <div class="flex flex-col justify-start mt-auto">
        <h4 class="whitespace-nowrap text-base font-semibold">
          R${{ formatPrice(item.valorUnitario) }}
        </h4>
        <h3 class="text-base text-gray-400 whitespace-nowrap" v-if="item.valorAntigo">
          <span class="line-through mr-1"> R${{ formatPrice(item.valorAntigo) }} </span>
          <span class="text-emerald-600">
            {{ formatPercentage(item.valorAntigo, item.valorUnitario) }}% off
          </span>
        </h3>
      </div>
    </div>
  </li>
</template>

<script setup>
import { Trash2 } from "lucide-vue-next";
import { formatPrice, formatPercentage } from "../../utils/formatarValores";
import favorite2 from "../../assets/images/favorite2.svg";

const props = defineProps({
  item: Object,
  index: Number,
  showModal: Function,
});

const emit = defineEmits(['removeFavorite']);

const removeFavorite = () => {
  emit('removeFavorite', props.item.codigoProduto);
};
</script>

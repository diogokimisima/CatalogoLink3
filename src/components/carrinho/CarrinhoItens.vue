<template>
  <li
    v-motion-fade-visible
    class="mb-6 p-2 rounded-md shadow-md shadow-neutral-400"
  >
    <div class="flex flex-col">
      <div class="flex flex-row items-center justify-between">
        <h2 class="text-lg">
          <span class="font-bold"
            >{{ index + 1 }} - {{ item.nomeProduto }}</span
          >
          ({{ item.codigoProduto }})
        </h2>
        <button @click="showModal(item)">
          <Trash2 />
        </button>
      </div>
      <div class="flex items-center">
        <img
          :src="item.imagem"
          :alt="'Imagem ' + item.numeroItem"
          class="w-28 h-28 object-contain mr-4"
        />
        <div>
          <p><span class="font-semibold">Cor:</span> {{ item.cor }}</p>
          <p>
            <span class="font-semibold">Valor Unitário:</span> R${{
              formatPrice(item.valorUnitario)
            }}
          </p>
          <p>
            <span class="font-semibold">Valor Total:</span> R${{
              formatPrice(item.valorTotal)
            }}
          </p>
        </div>
      </div>
    </div>

    <div class="flex items-center">
      <div class="flex gap-4 py-2 px-2 w-[80%] overflow-x-auto">
        <ul
          v-for="(quantidade, tamanho) in item.quantidadePorTamanho"
          :key="tamanho"
          class="flex flex-col items-center justify-center"
        >
          <li class="italic">
            {{ tamanho }}
          </li>
          <li class="py-0.5 px-3 bg-white shadow-md shadow-slate-500">
            {{ quantidade }}
          </li>
        </ul>
      </div>
      <div class="ml-auto py-2 pl-5 border-l-2 border-neutral-300">
        <p>Total</p>
        <p class="py-0.5 px-3 bg-white shadow-md shadow-slate-500">
          {{ somaQuantidade(item.quantidadePorTamanho) }}
        </p>
      </div>
    </div>
  </li>
</template>

<script setup>
import { Trash2 } from 'lucide-vue-next';
import { formatPrice } from '../../utils/formatarValores';

const props = defineProps({
  item: Object,
  index: Number,
  showModal: Function,
  somaQuantidade: Function,
});


</script>

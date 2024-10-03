<template>
  <transition name="slide" mode="out-in">
    <div
      v-if="selectedItem && somaTotal(selectedItem.id) != 0"
      :key="selectedItem.id"
      class="flex flex-col items-center justify-center gap-0 fixed top-24 right-8 z-50 bg-blue-950 w-[70px] h-[70px] rounded-full transform transition-transform duration-300"
    >
      <p class="text-slate-400 -mt-2">R$</p>
      <p class="text-white font-bold">
        {{ formatPrice(somaTotal(selectedItem.id)) }}
      </p>
    </div>
  </transition>

  <div class="modal-box h-full overflow-auto relative py-0 px-0">
    <form
      v-motion-fade-visible
      class="flex flex-col justify-between border-b border-b-gray-400 sticky top-0 bg-white z-10 py-2 px-4"
      method="dialog"
    >
      <div class="flex flex-row -mb-2">
        <h3 class="font-bold text-lg">
          {{ selectedItem?.title }}
          <span class="font-semibold">({{ selectedItem?.id_produto }})</span>
        </h3>
        <div class="flex-grow"></div>
        <button class="btn btn-sm btn-circle btn-ghost border-none focus:outline-none">
          <X class="size-8" />
        </button>
      </div>

      <div class="flex flex-row">
        <p class="text-lg font-semibold">{{ selectedItem?.cor }}</p>
      </div>
    </form>

    <div class="my-5 px-4">
      <img :src="selectedItem?.imagem" alt="imagem" />
    </div>

    <h2 class="my-3 text-center font-bold">Cores e modelos</h2>

    <div
      v-if="relatedItems.length > 1"
      class="overflow-y-auto flex items-center font-bold h-26 w-full my-5 px-4 scrollbar-none"
      id="categoriaIgual"
    >
      <ul class="flex flex-row space-x-2 gap-5 py-5 ">
        <li
          v-motion-fade-visible
          class="rounded w-28"
          v-for="relatedItem in relatedItems"
          :key="relatedItem.id"
          :class="{
            'border-b-2 border-gray-400 transition-colors duration-500 ease-in-out':
              relatedItem.imagem === selectedItem?.imagem,
          }"
        >
          <img
            class="object-contain"
            :src="relatedItem.imagem"
            :alt="'Image ' + relatedItem.id"
            @click="selectRelatedItem(relatedItem)"
          />
        </li>
      </ul>
    </div>

    <div class="flex justify-center">
      <table>
        <thead>
          <tr>
            <th class="p-4">
              <div class="flex justify-center items-center">
                <Ruler />
              </div>
            </th>
            <th class="p-4">
              <div class="flex justify-center items-center">
                <CandlestickChart />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="tamanho in selectedItem?.tamanho" :key="tamanho">
            <td class="p-4 italic">{{ tamanho }}</td>
            <td>
              <div class="flex justify-center items-center">
                <InputNumber2
                  :initialValue="getQuantidade(selectedItem.id, tamanho)"
                  @input="updateQuantidade(selectedItem.id, tamanho, $event)"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div :class="['px-4 mt-4', {'mb-28': relatedItems.length === 1}]">
      <p class="italic">
        <span class="font-semibold">Valor Unitário:</span> R${{ selectedItem?.valor }}
      </p>
      <p class="italic">
        <span class="font-semibold">Quantidade Total:</span>
        {{ totalQuantidadeSelecionada }}
      </p>
    </div>

    <div
      @click="handleAddToCart(selectedItem.title, somaTotal(selectedItem.id))"
      class="bg-white border-t border-gray-400 mt-2 sticky bottom-0 px-4 py-2"
    >
      <div class="flex items-center justify-center py-3 w-full bg-blue-950 rounded-md">
        <button class="flex text-white">
          <ShoppingCart class="mr-2 z-10" />
          Adicionar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { X, Ruler, CandlestickChart, ShoppingCart } from "lucide-vue-next";
import { formatPrice } from "../../../utils/formatarValores";
import InputNumber2 from "../catalogo/CatalogoInputNumber2.vue";

const props = defineProps({
  selectedItem: Object,
  relatedItems: Object,
  somaTotal: Function,
  getQuantidade: Function,
  updateQuantidade: Function,
  handleAddToCart: Function,
  selectRelatedItem: Function,
  totalQuantidadeSelecionada: Number,
});
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

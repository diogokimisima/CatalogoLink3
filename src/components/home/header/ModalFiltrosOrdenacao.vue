<template>
  <div
    v-if="showSideFilter"
    class="fixed top-0 right-0 h-full w-72 bg-white text-black p-3 transform transition-transform duration-300 z-40 overflow-x-auto"
  >
    <div
      class="sticky top-0 pt-1 z-10 mb-1 flex flex-col gap-2 border-b border-slate-400 bg-white"
    >
      <div class="flex items-center">
        <h2 class="text-2xl font-bold">Filtros e Ordenação</h2>
        <button @click="toggleSideFilter" class="ml-auto">
          <X class="w-7 h-7" />
        </button>
      </div>
      <div class="flex gap-2 mb-2">
        <button @click="clearAllFilters">
          <Trash2
            v-if="selectedSortBy != null && selectedSizes != [] && selectedColors != []"
          />
          <Trash v-else />
        </button>
        <p class="font-semibold">Remover todos os filtros</p>
      </div>
    </div>

    <!-- ORDENAR POR -->
    <div v-motion-fade-visible>
      <div @click="toggleDisplay('sortBy')" class="flex items-centers py-3">
        <h3 class="font-semibold text-lg">Ordenar por</h3>
        <button class="ml-auto">
          <ChevronDown v-if="!displayStates.sortBy" />
          <ChevronUp v-else />
        </button>
      </div>
      <ul v-if="displayStates.sortBy" class="my-3">
        <li class="mb-2 flex items-center">
          <button @click="sortBy('lowDiscount')">
            <Circle v-if="selectedSortBy !== 'lowDiscount'" class="rounded-full" />
            <CircleDot v-else class="rounded-full text-white bg-black" />
          </button>
          <label for="sortByLowDiscount" class="ml-2 cursor-pointer"
            >Menor Desconto</label
          >
        </li>
        <li class="mb-2 flex items-center">
          <button @click="sortBy('highDiscount')">
            <Circle v-if="selectedSortBy !== 'highDiscount'" class="rounded-full" />
            <CircleDot v-else class="rounded-full text-white bg-black" />
          </button>
          <label for="sortByHighDiscount" class="ml-2 cursor-pointer"
            >Maior Desconto</label
          >
        </li>
        <li class="mb-2 flex items-center">
          <button @click="sortBy('highPrice')">
            <Circle v-if="selectedSortBy != 'highPrice'" class="rounded-full" />
            <CircleDot v-else class="rounded-full text-white bg-black" />
          </button>
          <label for="sortByHighPrice" class="ml-2 cursor-pointer">Maior preço</label>
        </li>
        <li class="mb-2 flex items-center">
          <button @click="sortBy('lowPrice')">
            <Circle v-if="selectedSortBy != 'lowPrice'" class="rounded-full" />
            <CircleDot v-else class="rounded-full text-white bg-black" />
          </button>
          <label for="sortByLowPrice" class="ml-2 cursor-pointer">Menor preço</label>
        </li>
      </ul>
    </div>

    <!-- TAMANHO -->
    <div v-motion-fade-visible class="border-t border-slate-400">
      <div @click="toggleDisplay('size')" class="flex items-centers py-3">
        <h3 class="font-semibold text-lg">Filtrar por tamanho</h3>
        <button class="ml-auto">
          <ChevronDown v-if="!displayStates.size" />
          <ChevronUp v-else />
        </button>
      </div>
      <ul v-if="displayStates.size" class="flex flex-row flex-wrap gap-1 my-3">
        <li v-for="tamanho in uniqueSizes" :key="tamanho">
          <button
            :class="[
              'mb-2 border-2 bg-white border-black py-1 px-4 rounded-md',
              !selectedSizes.includes(tamanho)
                ? 'border-opacity-10'
                : 'border-opacity-100',
            ]"
            @click="toggleSizeSelection(tamanho)"
          >
            <div class="flex items-center justify-center">
              {{ tamanho }}
            </div>
          </button>
        </li>
      </ul>
    </div>

    <!-- CORES -->
    <div v-motion-fade-visible class="border-t border-slate-400">
      <div @click="toggleDisplay('color')" class="flex items-centers py-3">
        <h3 class="font-semibold text-lg">Filtrar por cor</h3>
        <button class="ml-auto">
          <ChevronDown v-if="!displayStates.color" />
          <ChevronUp v-else />
        </button>
      </div>
      <ul v-if="displayStates.color" class="flex flex-row flex-wrap gap-1 my-3">
        <li v-for="color in uniqueColors" :key="color.nome">
          <button @click="toggleColorSelection(color)" class="mb-2 bg-white py-1 px-2">
            <div class="flex flex-col items-center justify-center w-11 h-auto">
              <div
                :class="[
                  ' flex items-center justify-center w-7 h-7 rounded-full',
                  color.nome === 'branco' ? 'border border-black border-opacity-30' : '',
                ]"
                :style="`background-color: ${color.cor_predominante}`"
              >
                <Check
                  v-if="selectedColors.includes(color.nome)"
                  :class="[color.nome === 'preto' ? 'text-white' : '']"
                />
              </div>
              <p>{{ color.nome.charAt(0).toUpperCase() + color.nome.slice(1) }}</p>
            </div>
          </button>
        </li>
      </ul>
    </div>

    <div class="border-t border-slate-400"></div>
  </div>
</template>

<script setup>
import {
  Circle,
  CircleDot,
  ChevronDown,
  ChevronUp,
  Check,
  X,
  Trash,
  Trash2,
} from "lucide-vue-next";
import { ref, computed } from "vue";

const props = defineProps({
  showSideFilter: Boolean,
  displayStates: Object,
  uniqueSizes: Array,
  uniqueColors: Array,
  selectedSortBy: String,
  selectedSizes: Array,
  selectedColors: Array,
  toggleSideFilter: Function,
  clearAllFilters: Function,
  toggleDisplay: Function,
  sortBy: Function,
  toggleSizeSelection: Function,
  toggleColorSelection: Function,
});
</script>

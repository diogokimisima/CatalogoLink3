<template>
  <div class="bg-blue-950 text-gray-100 overflow-y-auto flex items-center h-20 -mt-2 lg:justify-center " >
    <ul class="flex flex-row mx-2">
      <li
        @click.prevent="selectCategory('Todos')"
        :class="[
          'px-6 py-2 cursor-pointer',
          selectedCategory === 'Todos'
            ? 'border-b-2 border-white transition-colors duration-500 ease-in-out'
            : 'border-b-2 border-transparent',
        ]"
      >
        <a class="block"> Todos </a>
      </li>
      <li
        v-for="categoria in categorias"
        :key="categoria"
        @click.prevent="selectCategory(categoria)"
        :class="[
          'px-3 py-2 cursor-pointer',
          selectedCategory === categoria
            ? 'border-b-2 border-white transition-colors duration-500 ease-in-out'
            : 'border-b-2 border-transparent',
        ]"
      >
        <a class="whitespace-nowrap text-base">
          {{ categoria.charAt(0).toUpperCase() + categoria.slice(1) }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { catalogo } from "../../../data/catalogo2.js";

const categorias = ref([]);
const selectedCategory = ref("Todos");
const emit = defineEmits(["category-selected"]);

const extrairCategorias = () => {
  const categoriasUnicas = [...new Set(catalogo.map((item) => item.categoria))];
  categorias.value = categoriasUnicas;
};

const selectCategory = (categoria) => {
  selectedCategory.value = categoria;
  emit("category-selected", categoria);
};

onMounted(() => {
  extrairCategorias();
});
</script>

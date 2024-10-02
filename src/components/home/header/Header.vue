<template>
  <header>
    <HeaderBanner />

    <div ref="headerBanner"></div>

    <div id="top"></div>

    <div :class="{ 'fixed top-0 w-full z-10': isSticky }">
      <HeaderCategorias @category-selected="updateCategory" />
    </div>

    <HeaderInput
      :isSticky="isSticky"
      @search="handleSearchInput"
      @toggle-filter="toggleSideFilter"
    />

    <transition name="fade">
      <div
        v-if="showSideFilter"
        class="fixed inset-0 bg-black bg-opacity-70 z-40"
        @click="toggleSideFilter"
      ></div>
    </transition>

    <transition name="slide" class="py-0">
      <ModalFiltrosOrdenacao
        :showSideFilter="showSideFilter"
        :displayStates="displayStates"
        :uniqueSizes="uniqueSizes"
        :uniqueColors="uniqueColors"
        :selectedSortBy="selectedSortBy"
        :selectedSizes="selectedSizes"
        :selectedColors="selectedColors"
        :toggleSideFilter="toggleSideFilter"
        :clearAllFilters="clearAllFilters"
        :toggleDisplay="toggleDisplay"
        :sortBy="sortBy"
        :toggleSizeSelection="toggleSizeSelection"
        :toggleColorSelection="toggleColorSelection"
      />
    </transition>
  </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { catalogo } from "../../../data/catalogo2.js";

import HeaderBanner from "./HeaderBanner.vue";
import HeaderCategorias from "./HeaderCategorias.vue";
import ModalFiltrosOrdenacao from "./ModalFiltrosOrdenacao.vue";
import HeaderInput from "./HeaderInput.vue";

const isSticky = ref(false);
const showSideFilter = ref(false);
const headerBanner = ref(null);
const currentLayout = ref("layout1");

const uniqueSizes = ref([]);
const uniqueColors = ref([]);

const selectedSortBy = ref(null);
const selectedSizes = ref([]);
const selectedColors = ref([]);
const displayStates = ref({
  sortBy: true,
  size: true,
  color: true,
});

const extractUniqueColors = (catalogo) => {
  const colorsMap = new Map();
  catalogo.forEach((item) => {
    const cor = item.cor.toLowerCase();
    if (!colorsMap.has(cor)) {
      colorsMap.set(cor, {
        nome: cor,
        cor_predominante: item.cor_predominante,
      });
    }
  });
  return Array.from(colorsMap.values());
};

const extractUniqueSizes = (catalogo) => {
  const sizes = new Set();
  catalogo.forEach((item) => {
    item.tamanho.forEach((size) => sizes.add(size));
  });
  return Array.from(sizes).sort((a, b) => a - b);
};

const clearAllFilters = () => {
  selectedSizes.value = [];
  selectedColors.value = [];
  selectedSortBy.value = null;

  const event = new CustomEvent("clear-filters");
  window.dispatchEvent(event);
};

const sortBy = (selected) => {
  selectedSortBy.value = selectedSortBy.value === selected ? null : selected;

  const event = new CustomEvent("sort-selected", { detail: selected });
  window.dispatchEvent(event);
};

const toggleSizeSelection = (size) => {
  const index = selectedSizes.value.indexOf(size);
  if (index === -1) {
    selectedSizes.value.push(size);
  } else {
    selectedSizes.value.splice(index, 1);
  }

  const event = new CustomEvent("sizes-selected", { detail: selectedSizes.value });
  window.dispatchEvent(event);
};

const toggleColorSelection = (color) => {
  const index = selectedColors.value.indexOf(color.nome); // Encontra o índice do tamanho no array
  if (index === -1) {
    selectedColors.value.push(color.nome); // Se o tamanho não estiver no array, adiciona
  } else {
    selectedColors.value.splice(index, 1); // Se o tamanho estiver no array, remove
  }

  const event = new CustomEvent("colors-selected", { detail: selectedColors.value });
  window.dispatchEvent(event);
};

const updateCategory = (categoria) => {
  const event = new CustomEvent("category-selected", { detail: categoria });
  window.dispatchEvent(event);

  document.getElementById("top").scrollIntoView({ behavior: "smooth" });
};

const handleSearchInput = (query) => {
  const event = new CustomEvent("search-input", { detail: query });
  window.dispatchEvent(event);
};

const handleScroll = () => {
  if (headerBanner.value) {
    const bannerBottom = headerBanner.value.getBoundingClientRect().bottom;
    isSticky.value = bannerBottom <= 0;
  }
};

const toggleDisplay = (section) => {
  displayStates.value[section] = !displayStates.value[section];
};

const toggleSideFilter = () => {
  showSideFilter.value = !showSideFilter.value;
};

window.addEventListener("layout-changed", (event) => {
  currentLayout.value = event.detail;
  clearAllFilters();
});

onMounted(() => {
  uniqueSizes.value = extractUniqueSizes(catalogo);
  uniqueColors.value = extractUniqueColors(catalogo);
  window.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});

watch(showSideFilter, (newValue) => {
  if (newValue) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
  }
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

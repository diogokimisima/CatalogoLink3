<!-- Catalogo.vue -->

<template>
  <div>
    <!-- Card -->
    <div v-if="filteredCatalogo.length === 0" class="text-center mt-5">
      <h1 class="font-semibold">NENHUM PRODUTO ENCONTRADO.</h1>
    </div>

    <div
      class="max-w-screen-2xl flex flex-row flex-wrap justify-center items-center mx-auto gap-2.5"
    >
      <div v-for="(item, index) in filteredCatalogo" :key="item.id">
        <CatalogoCard
          :item="item"
          :is-last-card="index === filteredCatalogo.length - 1"
          @showModal="showModal"
        />
      </div>
    </div>

    <transition name="slide">
      <ToastSuccess
        v-if="showToast"
        message="Produto adicionado ao carrinho com sucesso"
      />
    </transition>

    <!-- Modal -->
    <dialog ref="myModal" id="my_modal_3" class="modal py-5">
      <ModalCatalogoCompra
        :selectedItem="selectedItem"
        :relatedItems="relatedItems"
        :somaTotal="somaTotal"
        :getQuantidade="getQuantidade"
        :updateQuantidade="updateQuantidade"
        :handleAddToCart="handleAddToCart"
        :totalQuantidadeSelecionada="totalQuantidadeSelecionada"
        :selectRelatedItem="selectRelatedItem"
      />
    </dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, reactive } from "vue";
import { useStore } from "vuex";

import { removeDiacritics } from "../../../utils/formatarValores.js";
import { catalogo } from "../../../data/catalogo2.js";
import ToastSuccess from "../../toasts/ToastSuccess.vue";
import CatalogoCard from "./CatalogoCard.vue";
import ModalCatalogoCompra from "./ModalCatalogoCompra2.vue";

const props = defineProps({
  selectedCategory: {
    type: String,
    default: "Todos",
  },
});

const selectedItem = ref(null);
const myModal = ref(null);
const selectedCategory = ref("Todos");
const searchQuery = ref("");
const sortByCriteria = ref(null);
const selectedSizes = ref([]);
const selectedColors = ref([]);
const quantidades = reactive({});
const showToast = ref(false);

const store = useStore();
const emit = defineEmits(["adicionarAoCarrinho", "clear-filters"]);

const updateCategory = (categoria) => {
  selectedCategory.value = categoria;
};

const handleSizeSelected = (sizes) => {
  selectedSizes.value = sizes;
};

const handleSearchInput = (query) => {
  searchQuery.value = query;
};

const handleSortSelected = (criteria) => {
  sortByCriteria.value = sortByCriteria.value === criteria ? null : criteria;
};

const handleColorSelected = (color) => {
  selectedColors.value = color;
};

const selectRelatedItem = (item) => {
  selectedItem.value = item;
};

const handleAddToCart = () => {
  store.dispatch("addToCart", {
    codigoProduto: selectedItem.value.id_produto,
    nomeProduto: selectedItem.value.title,
    valorUnitario: selectedItem.value.valor,
    valorTotal: somaTotal(selectedItem.value.id),
    quantidadePorTamanho: quantidades[selectedItem.value.id],
    imagem: selectedItem.value.imagem,
    cor: selectedItem.value.cor,
  });
  quantidades[selectedItem.value.id] = {};
  myModal.value.close();

  showToast.value = true;
  setTimeout(() => {
    showToast.value = false;
  }, 3000);
};

const getQuantidade = (id, tamanho) => {
  if (!quantidades[id]) {
    return 0;
  }
  return quantidades[id][tamanho] || 0;
};

const updateQuantidade = (id, tamanho, quantidade) => {
  if (!quantidades[id]) {
    quantidades[id] = {};
  }
  quantidades[id][tamanho] = quantidade;
};

const totalQuantidadeSelecionada = computed(() => {
  if (!selectedItem.value || !quantidades[selectedItem.value.id]) {
    return 0;
  }
  return Object.values(quantidades[selectedItem.value.id]).reduce(
    (total, quantidade) => total + quantidade,
    0
  );
});

const somaTotal = (id) => {
  if (!quantidades[id]) {
    return 0;
  }
  return Object.entries(quantidades[id]).reduce((total, [tamanho, quantidade]) => {
    return total + selectedItem.value.valor * quantidade;
  }, 0);
};

const clearAllFilters = () => {
  selectedSizes.value = [];
  selectedColors.value = [];
  sortByCriteria.value = null;

  emit("clear-filters");
};

const filteredCatalogo = computed(() => {
  let filteredItems = catalogo;

  if (props.selectedCategory !== "Todos") {
    filteredItems = filteredItems.filter(
      (item) => item.categoria === props.selectedCategory
    );
  }

  if (searchQuery.value.trim() !== "") {
    const query = removeDiacritics(searchQuery.value.trim().toLowerCase());
    filteredItems = filteredItems.filter(
      (item) =>
        removeDiacritics(item.title.toLowerCase()).includes(query) ||
        removeDiacritics(item.id_produto.toLowerCase()).includes(query) ||
        removeDiacritics(item.cor.toLowerCase()).includes(query)
    );
  }

  if (sortByCriteria.value === "highPrice") {
    filteredItems = [...filteredItems].sort((a, b) => b.valor - a.valor);
  } else if (sortByCriteria.value === "lowPrice") {
    filteredItems = [...filteredItems].sort((a, b) => a.valor - b.valor);
  } else if (sortByCriteria.value === "highDiscount") {
    filteredItems = filteredItems.filter((item) => item.valor_antigo);
    filteredItems = [...filteredItems].sort((a, b) => {
      const discountPercentA = ((a.valor_antigo - a.valor) / a.valor_antigo) * 100;
      const discountPercentB = ((b.valor_antigo - b.valor) / b.valor_antigo) * 100;
      return discountPercentB - discountPercentA;
    });
  } else if (sortByCriteria.value === "lowDiscount") {
    filteredItems = filteredItems.filter((item) => item.valor_antigo);
    filteredItems = [...filteredItems].sort((a, b) => {
      const discountPercentA = ((a.valor_antigo - a.valor) / a.valor_antigo) * 100;
      const discountPercentB = ((b.valor_antigo - b.valor) / b.valor_antigo) * 100;
      return discountPercentA - discountPercentB;
    });
  }

  if (selectedColors.value.length > 0) {
    filteredItems = filteredItems.filter((item) =>
      selectedColors.value.includes(item.cor.toLowerCase())
    );
  }

  if (selectedSizes.value.length > 0) {
    filteredItems = filteredItems.filter((item) =>
      selectedSizes.value.some((size) => item.tamanho.includes(size))
    );
  }
  return filteredItems;
});

const relatedItems = computed(() => {
  if (!selectedItem.value) return [];
  return catalogo.filter((item) => item.id_categoria === selectedItem.value.id_categoria);
});

const showModal = (item) => {
  selectedItem.value = item;
  myModal.value.showModal();
  scrollToTop();
};

const scrollToTop = () => {
  const modalBox = myModal.value.querySelector(".modal-box");
  if (modalBox) {
    modalBox.scrollTop = 0;
  }
};

onMounted(() => {
  window.addEventListener("category-selected", (event) => {
    updateCategory(event.detail);
  });

  window.addEventListener("search-input", (event) => {
    handleSearchInput(event.detail);
  });

  window.addEventListener("sort-selected", (event) => {
    handleSortSelected(event.detail);
  });

  window.addEventListener("sizes-selected", (event) => {
    handleSizeSelected(event.detail);
  });

  window.addEventListener("colors-selected", (event) => {
    handleColorSelected(event.detail);
  });

  window.addEventListener("clear-filters", clearAllFilters);
});

onBeforeUnmount(() => {
  window.removeEventListener("category-selected", updateCategory);
  window.removeEventListener("search-input", handleSearchInput);
  window.removeEventListener("sort-selected", handleSortSelected);
  window.removeEventListener("sizes-selected", handleSizeSelected);
  window.removeEventListener("colors-selected", handleColorSelected);
  window.removeEventListener("clear-filters", clearAllFilters);
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

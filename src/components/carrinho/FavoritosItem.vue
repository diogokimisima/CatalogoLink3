<template>
  <li
    v-motion-fade-visible
    class="px-2 py-2 w-[165px] rounded-md shadow-md shadow-neutral-400"
    @click="showModal"
  >
    <div class="flex flex-col justify-between gap-y-2 h-full">
      <div class="">
        <img
          :src="item.imagem"
          :alt="'Imagem ' + item.numeroItem"
          class="w-[165px] h-[165px] object-contain mr-4 relative"
        />
        <button class="absolute top-3 right-1" @click.stop="removeFavorite">
          <img class="w-6 h-6" :src="favorite2" alt="imagem favorito" />
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

  <dialog ref="myModal" id="my_modal_3" class="modal py-5">
    <ModalCatalogoCompraFavorites
      :itemId="item.codigoProduto"
      :itemName="item.nomeProduto"
      :itemImage="item.imagem"
      :itemPrice="item.valorUnitario"
      :itemSizes="item.tamanho"
      :itemColor="item.cor"
      @addToCart="handleAddToCart"
      @itemAdded="showToastMessage"
    />
  </dialog>

  <transition name="slide">
    <ToastSuccess v-if="showToast" message="Produto adicionado ao carrinho com sucesso" />
  </transition>
</template>

<script setup>
import { Trash2 } from "lucide-vue-next";
import { ref, computed, reactive } from "vue";
import { useStore } from "vuex";
import { formatPrice, formatPercentage } from "../../utils/formatarValores.js";

import ToastSuccess from "../toasts/ToastSuccess.vue";
import favorite2 from "../../assets/images/favorite2.svg";
import ModalCatalogoCompraFavorites from "../home/catalogo/ModalCatalogoCompraFavorites.vue";

const selectedItem = ref(null);
const quantidades = reactive({});
const store = useStore();
const myModal = ref(null);
const showToast = ref(false);

const emit = defineEmits(["removeFavorite"]);

const props = defineProps({
  item: Object,
  index: Number,
  showModal: Function,
});

const showModal = () => {
  myModal.value.showModal();
};

const showToastMessage = () => {
  showToast.value = true;
  setTimeout(() => {
    showToast.value = false;
  }, 3000);
};

const handleAddToCart = (itemToAdd) => {
  store.dispatch("addToCart", itemToAdd);
  myModal.value.close();
};

const removeFavorite = () => {
  emit("removeFavorite", props.item.codigoProduto);
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

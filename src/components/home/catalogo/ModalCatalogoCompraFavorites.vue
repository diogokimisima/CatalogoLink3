<template>
  <transition name="slide" mode="out-in">
    <div
      v-if="somaTotal() != 0"
      :key="itemId"
      class="flex flex-col items-center justify-center gap-0 fixed top-24 right-8 z-50 bg-blue-950 w-[70px] h-[70px] rounded-full transform transition-transform duration-300"
    >
      <p class="text-slate-400 -mt-2">R$</p>
      <p class="text-white font-bold">
        {{ formatPrice(somaTotal()) }}
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
        <h3 class="font-bold text-lg">{{ itemName }}</h3>
        <div class="flex-grow"></div>
        <button class="btn btn-sm btn-circle btn-ghost border-none focus:outline-none">
          <X class="size-8" />
        </button>
      </div>

      <div class="flex flex-row">
        <p class="text-lg text-black">
          {{ itemColor }} -
          <span>({{ itemId }})</span>
        </p>
      </div>
    </form>

    <div class="my-5 px-4 flex justify-center items-center">
      <img :src="itemImage" alt="imagem" />
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
          <tr v-for="tamanho in itemSizes" :key="tamanho">
            <td class="p-4 italic">{{ tamanho }}</td>
            <td>
              <div class="flex justify-center items-center">
                <InputNumber2
                  :initialValue="getQuantidade(itemId, tamanho)"
                  @input="updateQuantidade(itemId, tamanho, $event)"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="px-4 mt-4">
      <p class="italic">
        <span class="font-semibold">Valor Unitário:</span> R${{ formatPrice(itemPrice) }}
      </p>
      <p class="italic">
        <span class="font-semibold">Quantidade Total:</span>
        {{ totalQuantidadeSelecionada }}
      </p>
    </div>

    <div
      @click="handleAddToCart"
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
import { ref, computed } from "vue";
import { X, Ruler, CandlestickChart, ShoppingCart } from "lucide-vue-next";
import { formatPrice } from "../../../utils/formatarValores";
import InputNumber2 from "../catalogo/CatalogoInputNumber2.vue";
import ToastSuccess from "../../toasts/ToastSuccess.vue";

const props = defineProps({
  itemId: String,
  itemName: String,
  itemImage: String,
  itemPrice: Number,
  itemSizes: Array,
  itemColor: String,
});

const emit = defineEmits(["addToCart", "itemAdded"]);

const quantidades = ref({});

const getQuantidade = (productId, size) => {
  return quantidades.value[productId] && quantidades.value[productId][size]
    ? quantidades.value[productId][size]
    : 0;
};

const updateQuantidade = (productId, size, quantity) => {
  if (!quantidades.value[productId]) {
    quantidades.value[productId] = {};
  }
  quantidades.value[productId][size] = quantity;
};

const totalQuantidadeSelecionada = computed(() => {
  if (!props.itemId || !quantidades.value[props.itemId]) {
    return 0;
  }
  return Object.values(quantidades.value[props.itemId]).reduce(
    (total, quantidade) => total + quantidade,
    0
  );
});

const somaTotal = () => {
  const itemQuantities = quantidades.value[props.itemId] || {};
  return Object.values(itemQuantities).reduce((total, quantity) => {
    return total + props.itemPrice * quantity;
  }, 0);
};

const handleAddToCart = () => {
  emit("addToCart", {
    codigoProduto: props.itemId,
    nomeProduto: props.itemName,
    valorUnitario: props.itemPrice,
    valorTotal: somaTotal(),
    quantidadePorTamanho: quantidades.value[props.itemId],
    imagem: props.itemImage,
    cor: props.itemColor,
  });

  quantidades.value[props.itemId] = {};
  emit("itemAdded");
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

<template>
  <transition name="slide">
    <ToastSuccess
      class="z-50"
      v-if="showToastSuccess"
      message="Produto excluído com sucesso"
    />
  </transition>

  <CarrinhoHeader />

  <div class="flex flex-col justify-center items-center">
    <CarrinhoVazio v-if="carrinho.length === 0" />
    <div class="px-4 w-full">
      <div v-if="carrinho.length !== 0" class="flex my-5">
        <h2 class="text-center bg-blue-950 text-white p-3 rounded-md">
          <span class="text-gray-400">Subtotal:</span> R${{
            formatPrice(valorTotalCarrinho)
          }}
        </h2>
        <button
          onclick="my_modal_3.showModal()"
          class="text-center bg-blue-950 text-white p-3 rounded-md ml-auto"
        >
          Finalizar
        </button>
      </div>

      <ul class="mb-24">
        <CarrinhoItens
          v-for="(item, index) in carrinho"
          :key="index"
          :item="item"
          :index="index"
          :showModal="showModal"
          :somaQuantidade="somaQuantidade"
        />
      </ul>
    </div>
  </div>

  <!-- modal para excluir um item do carrinho -->
  <dialog ref="myModal" id="my_modal_2" class="modal">
    <ModalConfirmarExclusao
      :removerDoCarrinho="removerDoCarrinho"
      :selectedItem="selectedItem"
      :index="index"
    />
  </dialog>

  <!-- modal para finalizar o carrinho -->
  <dialog id="my_modal_3" class="modal">
    <transition name="slide">
      <ToastError class="z-50" v-if="showToastError" :message="toastErrorMessage" />
    </transition>

    <ModalFinalizarCarrinho
      :confirmarCarrinho="confirmarCarrinho"
      :nome="nome"
      :email="email"
      :celular="celular"
      @update:nome="nome = $event"
      @update:email="email = $event"
      @update:celular="celular = $event"
    />
  </dialog>
</template>

<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { X } from "lucide-vue-next";

import { formatPrice } from "../utils/formatarValores.js";
import ToastSuccess from "../components/toasts/ToastSuccess.vue";
import ToastError from "../components/toasts/ToastError.vue";
import CarrinhoVazio from "../components/carrinho/CarrinhoVazio.vue";
import CarrinhoHeader from "../components/carrinho/CarrinhoHeader.vue";
import CarrinhoItens from "../components/carrinho/CarrinhoItens.vue";
import ModalConfirmarExclusao from "../components/carrinho/ModalConfirmarExclusao.vue";
import ModalFinalizarCarrinho from "../components/carrinho/ModalFinalizarCarrinho.vue";

const showToastSuccess = ref(false);
const showToastError = ref(false);
const toastErrorMessage = ref("");
const selectedItem = ref(null);
const myModal = ref(null);
const store = useStore();
const nome = ref("");
const email = ref("");
const celular = ref("");

const carrinho = computed(() => store.getters.cartItems);

carrinho.value.forEach((item, index) => {
  item.numeroItem = index + 1;
});

const showModal = (item) => {
  selectedItem.value = item;
  myModal.value.showModal();
};

const somaQuantidade = (quantidadePorTamanho) => {
  return Object.values(quantidadePorTamanho).reduce(
    (total, quantidade) => total + quantidade,
    0
  );
};

const somaQuantidadeTotal = () => {
  return carrinho.value.reduce(
    (total, item) => total + somaQuantidade(item.quantidadePorTamanho),
    0
  );
};

const numeroAleatorio = () => {
  return Math.floor(Math.random() * 90000) + 10000;
};

const valorTotalCarrinho = computed(() => {
  return carrinho.value.reduce((total, item) => total + item.valorTotal, 0);
});

const removerDoCarrinho = (index) => {
  store.dispatch("removeFromCart", index);

  showToastSuccess.value = true;
  setTimeout(() => {
    showToastSuccess.value = false;
  }, 2000);
};

const validarEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validarTelefone = (telefone) => {
  const telefoneRegex = /^\d{10,11}$/; // 10 dígitos para números fixos e 11 para números móveis
  return telefoneRegex.test(telefone);
};


const confirmarCarrinho = () => {
  const mensagem = `
*Olá, gostaria de confirmar meu pedido do catálogo:*

*Nome:* ${nome.value}
*Email:* ${email.value}
*Celular:* ${celular.value}

*Resumo do Carrinho:*

_Carrinho:_ #${numeroAleatorio()}
_Quantidades Total:_ ${somaQuantidadeTotal()}
_Valor Total:_ R$ ${formatPrice(valorTotalCarrinho.value)}

_Resumo do pedido:_ https://catalogo-link.com/pedido/${numeroAleatorio()}/resumo
  `;

  const mensagemCodificada = encodeURIComponent(mensagem.trim());
  const numeroWhatsApp = "5511948256352";
  const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensagemCodificada}`;

  if (nome.value === "") {
    setTimeout(() => {
      showToastError.value = false;
    }, 2000);

    toastErrorMessage.value = "Preencha o campo nome!";
    return (showToastError.value = true);
  }

  if (!validarEmail(email.value)) {
    setTimeout(() => {
      showToastError.value = false;
    }, 2000);

    toastErrorMessage.value = "Preencha com um email válido";
    return (showToastError.value = true);
  }

  if (!validarTelefone(celular.value)) {
    setTimeout(() => {
      showToastError.value = false;
    }, 2000);

    toastErrorMessage.value = "Preencha com um número de celular válido";
    return (showToastError.value = true);
  }

  window.open(urlWhatsApp, "_blank");
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

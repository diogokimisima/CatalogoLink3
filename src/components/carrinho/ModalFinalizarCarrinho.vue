<template>
  <div class="modal-box">
    <form method="dialog">
      <button
        class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 border-none focus:outline-none"
        @click="$emit('close')"
      >
        <X class="size-8" />
      </button>
    </form>
    <h3 class="text-lg font-bold">Finalização do carrinho</h3>
    <div class="flex flex-col gap-4 mt-5">
      <label class="input input-bordered flex items-center gap-2">
        <User />
        <input
          :value="nome"
          @input="updateNome"
          type="text"
          class="grow"
          placeholder="Nome"
        />
      </label>
      <label class="input input-bordered flex items-center gap-2">
        <Mail />
        <input
          :value="email"
          @input="updateEmail"
          type="email"
          class="grow"
          placeholder="Email"
        />
      </label>
      <label class="input input-bordered flex items-center gap-2">
        <Phone />
        <MaskInput
          :value="celular"
          @input="updateCelular"
          type="tel"
          mask="(##) #####-####"
          class="grow"
          placeholder="Celular: (99) 99999-9999"
        />
      </label>
      <button @click="confirmarCarrinho" class="bg-blue-950 text-white p-2 rounded-md">
        Confirmar
      </button>
    </div>
  </div>
</template>

<script setup>
import { Phone, Mail, User, X } from 'lucide-vue-next';
import { MaskInput } from 'vue-3-mask';
import { defineEmits, defineProps } from 'vue';

const props = defineProps({
  confirmarCarrinho: Function,
  nome: String,
  email: String,
  celular: String,
});

const emit = defineEmits(['update:nome', 'update:email', 'update:celular', 'close']);

const updateNome = (event) => {
  emit('update:nome', event.target.value);
};

const updateEmail = (event) => {
  emit('update:email', event.target.value);
};

const updateCelular = (event) => {
  emit('update:celular', event.target.value);
};
</script>

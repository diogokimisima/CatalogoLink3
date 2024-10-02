<template>
  <div class="modal-box">
    <h3 class="text-lg font-bold">Confirmação de exclusão</h3>
    <p class="py-4">
      Confirma a exclusão do item
      <span class="font-bold"
        >{{ selectedItem?.numeroItem }} - {{ selectedItem?.nomeProduto }}?</span
      >
    </p>
    <form method="dialog" class="mt-5">
      <div class="flex">
        <button
          class="border-neutral-200 border p-2 rounded-md focus:outline-none"
          @click="removerDoCarrinho(index)"
        >
          Confirmar
        </button>
        <button
          class="ml-auto border-neutral-200 border p-2 rounded-md focus:outline-none"
        >
          Cancelar
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>

const props = defineProps({
  removerDoCarrinho: Function,
  selectedItem: Object,
  index: Number,
});
</script>

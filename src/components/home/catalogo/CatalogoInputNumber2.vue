<template>
  <form class="max-w-xs mx-auto my-0">
    <div class="flex items-center max-w-[8rem]">
      <button
        type="button"
        id="decrement-button"
        @click="decrement"
        class="border-none p-3 h-11"
      >
        <Minus
          :class="[
            quantidade < 1 ? 'opacity-15' : '',
            'rounded-lg text-white bg-red-600',
          ]"
        />
      </button>

      <input
        type="text"
        data-input-counter
        aria-describedby="helper-text-explanation"
        class="bg-gray-50 shadow-slate-500 shadow-sm h-11 text-center text-gray-900 text-sm block w-12 rounded-md bg-transparent"
        placeholder="0"
        required
        v-model="quantidade"
        @input="handleInput"
      />

      <button
        type="button"
        id="increment-button"
        @click="increment"
        class="bg-gray-100 border p-3 h-11 border-none bg-transparent"
      >
        <Plus class="bg-emerald-500 rounded-lg text-white" />
      </button>
    </div>
  </form>
</template>

<script setup>
import { Plus, Minus } from "lucide-vue-next";
import { ref, watch } from "vue";

const props = defineProps({
  initialValue: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(["input"]);
const quantidade = ref(props.initialValue);

const increment = () => {
  quantidade.value++;
  emit("input", quantidade.value);
};

const decrement = () => {
  if (quantidade.value > 0) {
    quantidade.value--;
    emit("input", quantidade.value);
  }
};

const handleInput = () => {
  emit("input", parseInt(quantidade.value, 10) || 0);
};

watch(
  () => props.initialValue,
  (newValue) => {
    quantidade.value = newValue;
  }
);
</script>

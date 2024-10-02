<template>
  <transition name="slide">
    <div
      v-if="isSidebarOpen"
      class="fixed inset-y-0 left-0 w-72 bg-slate-200 text-black p-4 transform transition-transform duration-300 z-50"
    >
      <div class="flex items-center mb-6">
        <h2 class="text-2xl font-bold">Menu</h2>
        <button @click="toggleSidebar" class="ml-auto">
          <X class="w-7 h-7" />
        </button>
      </div>
      <ul class="flex flex-col gap-1">
        <li class="flex mb-2 gap-1">
          <button @click="selectLayout('layout1')">
            <CircleDot
              class="text-white bg-black rounded-full"
              v-if="selectedLayout === 'layout1'"
            />
            <Circle v-else />
          </button>
          <label>Layout 1</label>
        </li>
        <li class="flex mb-2 gap-1">
          <button @click="selectLayout('layout2')">
            <CircleDot
              class="text-white bg-black rounded-full"
              v-if="selectedLayout === 'layout2'"
            />
            <Circle v-else />
          </button>
          <label>Layout 2</label>
        </li>
        <li class="flex mb-2 gap-1">
          <button @click="selectLayout('layout3')">
            <CircleDot
              class="text-white bg-black rounded-full"
              v-if="selectedLayout === 'layout3'"
            />
            <Circle v-else />
          </button>
          <label>Layout 3</label>
        </li>
      </ul>
    </div>
  </transition>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import { Circle, CircleDot, X } from "lucide-vue-next";

const props = defineProps({
  isSidebarOpen: Boolean,
  selectedLayout: String,
});

const emit = defineEmits(["toggleSidebar", "selectLayout"]);

const toggleSidebar = () => {
  emit("toggleSidebar");
};

const selectLayout = (layout) => {
  emit("selectLayout", layout);
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
  transform: translateX(-100%);
}

.slide-enter-to,
.slide-leave-from {
  opacity: 1;
  transform: translateX(0);
}
</style>

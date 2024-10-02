<template>
  <div class="w-full h-auto">
    <ToolBarSection :toggleSidebar="toggleSidebar" />

    <ModalSelectLayout
      :isSidebarOpen="isSidebarOpen"
      :selectedLayout="selectedLayout"
      @toggleSidebar="toggleSidebar"
      @selectLayout="handleSelectLayout"
      class="z-50"
    />

    <transition name="fade">
      <div
        v-if="isSidebarOpen"
        class="fixed inset-0 bg-black bg-opacity-70 "
        @click="toggleSidebar"
      ></div>
    </transition>

    
  </div>
</template>

<script setup>
import { ref } from "vue";

import ModalSelectLayout from "./ModalSelectLayout.vue";
import ToolBarSection from "./ToolBarSection.vue";

const isSidebarOpen = ref(false);
const selectedLayout = ref("layout1");

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const handleSelectLayout = (layout) => {
  selectedLayout.value = layout;
  window.dispatchEvent(new CustomEvent("layout-changed", { detail: layout }));
  toggleSidebar();
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

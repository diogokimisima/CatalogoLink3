<template>
  <div class="relative bg-slate-white my-0 mx-0 py-0 px-0">
    <router-view />
    <ToolBar class="fixed bottom-0 z-30" />
  </div>
</template>

<script setup>
import ToolBar from "./components/tool-bar/ToolBar.vue";
</script>

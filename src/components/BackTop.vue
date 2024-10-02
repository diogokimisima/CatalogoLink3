<template>
  <div
    v-if="backTop"
    class="flex items-center justify-center my-2 mx-2 bg-blue-950 fixed bottom-20 right-4 w-14 h-14 rounded-full cursor-pointer"
    @click="scrollToTop"
  >
    <ChevronUp class="text-white size-9" />
  </div>
</template>

<script setup>
import { ChevronUp } from "lucide-vue-next";
import { ref, onMounted, onUnmounted } from "vue";

const backTop = ref(false);

const scrollToTop = () => {
  window.scrollTo({
    top: 150,
    behavior: "smooth",
  });
};

const handleScroll = () => {
  const scrollThreshold =
    document.documentElement.scrollHeight - window.innerHeight - 200;
  backTop.value = window.scrollY > scrollThreshold;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

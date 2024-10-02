<template>
  <div class="carousel w-full h-36">
    <div
      v-for="(item, index) in banner"
      :key="item.id"
      :id="'slide' + item.id"
      class="carousel-item relative w-full"
    >
      <img :src="item.imagem" class="w-full h-auto object-cover" />
      <div
        class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2"
      >
        <a
          :href="'#slide' + (index === 0 ? banner.length : index)"
          class="btn text-2xl -ml-7 bg-transparent border-none hover:bg-transparent hover:border-none"
        >
          ❮
        </a>

        <a
          :href="'#slide' + (index === banner.length - 1 ? 1 : index + 2)"
          class="btn text-2xl -mr-6 bg-transparent border-none hover:bg-transparent hover:border-none"
        >
          ❯
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { banner } from "../../../data/banner.js";
</script>

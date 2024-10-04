<template>
  <header>
    <div role="tablist" class="tabs tabs-lifted py-5 px-1">
      <router-link
        to="/carrinho"
        role="tab"
        class="tab text-nowrap h-12 bg-neutral-200 text-black text-opacity-30"
      >
        <span
          class="bg-blue-950 w-5 h-5 rounded-full text-white flex items-center justify-center bg-opacity-30 mr-1"
          >1</span
        >
        Carrinho
      </router-link>
      <router-link to="/favoritos" role="tab" class="tab tab-active h-12">
        <span
          class="bg-blue-950 w-5 h-5 rounded-full text-white flex items-center justify-center mr-1"
          >2</span
        >
        Favoritos
      </router-link>
    </div>
    <div class="flex justify-center">
      <h1 class="font-bold text-xl border-b border-slate-400">Favoritos</h1>
    </div>
  </header>
</template>

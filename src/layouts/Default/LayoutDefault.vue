<template>
  <div class="flex h-screen">
    <div class="flex flex-col flex-1 relative">
      <LayoutDefaultHeader />
      <main class="flex-1 flex overflow-y-auto">
        <slot />
      </main>
      <LayoutDefaultFooter />
    </div>
  </div>
</template>

<script setup lang="ts">
import LayoutDefaultFooter from './components/LayoutDefaultFooter.vue';
import LayoutDefaultHeader from './components/LayoutDefaultHeader.vue';
</script>

<template>
  <div>
    <LayoutDefaultHeader />
    <main>
      <slot />
    </main>
    <LayoutDefaultFooter />
  </div>
</template>

<script setup lang="ts">
import LayoutDefaultFooter from './components/LayoutDefaultFooter.vue';
import LayoutDefaultHeader from './components/LayoutDefaultHeader.vue';
</script>

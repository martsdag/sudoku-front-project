<template>
  <div class="layout-default">
    <LayoutDefaultHeader />
    <main class="layout-default__main">
      <slot />
    </main>
    <LayoutDefaultFooter />
  </div>
</template>

<script setup lang="ts">
import LayoutDefaultFooter from './components/LayoutDefaultFooter.vue';
import LayoutDefaultHeader from './components/LayoutDefaultHeader.vue';
</script>

<style>
.layout-default {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
  background-color: var(--color-white);
}

.layout-default__main {
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
}
</style>

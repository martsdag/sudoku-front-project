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
  overflow: hidden;
}

.layout-default__main {
  scrollbar-gutter: stable both-edges;
  position: relative;
  overflow-y: auto;
  display: flex;
  flex: 1;
  flex-direction: column;
}
</style>

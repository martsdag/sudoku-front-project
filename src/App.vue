<template>
  <div class="app">
    <RouterView />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="css">
.app {
  display: flex;
  flex-direction: column;
  background-color: rgb(226, 234, 252);
  height: 100vh;
  align-items: center;
  overflow: hidden;
}
</style>

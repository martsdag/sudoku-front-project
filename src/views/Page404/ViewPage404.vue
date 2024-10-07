<template>
  <div class="container">
    <h1 class="text-404">404</h1>
    <p class="text-page">Page not found.</p>
    <p>
      This page might have been removed, had its name changed or temporarily unavailable. Or you might have misspelled
      the URL.
    </p>
    <RouterLink :to="{ name: RouteName.Home }" class="text-to-home">To home</RouterLink>
  </div>
</template>

<script setup lang="ts">
import { RouteName } from '@/router';
</script>

<style lang="css">
.container {
  max-width: 75rem;
  width: 90%;
  margin: 0% auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1 1 0%;
  gap: 1.5rem;
  flex-direction: column;
}
.text-404 {
  font-size: 4rem;
  line-height: 1rem;
  margin-bottom: 0%;
}
.text-page {
  font-size: 2rem;
  margin-bottom: 0%;
}
.text-to-home {
  font-size: 1.8rem;
  line-height: 1.75rem;
}
</style>

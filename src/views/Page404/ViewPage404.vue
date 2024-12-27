<template>
  <div class="page-404 _container _page">
    <h1 class="page-404__title">404</h1>
    <p class="page-404__subtitle">Page not found.</p>
    <p class="page-404__description">
      This page might have been removed, had its name changed or temporarily unavailable. Or you might have misspelled
      the URL.
    </p>
    <RouterLink :to="{ name: RouteName.Home }" class="page-404__link">To home</RouterLink>
  </div>
</template>

<script setup lang="ts">
import { RouteName } from '@/router';
</script>

<style>
.page-404 {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1 1 0%;
  gap: 1.5rem;
  flex-direction: column;
}

.page-404__title {
  font-size: 4rem;
  line-height: 1rem;
  margin-bottom: 0%;
}

.page-404__subtitle {
  font-size: 2rem;
  margin-bottom: 0%;
  text-align: center;
}

.page-404__description {
  color: var(--color-zinc-400);
}

.page-404__link {
  font-size: 1.8rem;
  line-height: 1.75rem;
}
</style>

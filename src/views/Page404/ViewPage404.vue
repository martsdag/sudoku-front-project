<template>
  <div class="page-404 _container _page">
    <h1 class="page-404__title">404</h1>
    <p class="page-404__subtitle">{{ t('page404') }}</p>
    <p class="page-404__description">{{ t('page404Description') }}</p>
    <RouterLink :to="{ name: RouteName.Home }" class="page-404__link">{{ t('mainPage') }}</RouterLink>
  </div>
</template>

<i18n lang="json">
{
  "En": {
    "page404": "Page not found.",
    "page404Description": "This page might have been removed, had its name changed or temporarily unavailable. Or you might have misspelled the URL.",
    "mainPage": "To home"
  },
  "Ru": {
    "page404": "Страница не найдена.",
    "page404Description": "Возможно, она была перемещена, или вы просто неверно указали адрес страницы.",
    "mainPage": "На главную"
  }
}
</i18n>

<script setup lang="ts">
import { RouteName } from '@/router';
import { useI18n } from 'vue-i18n';

const { t } = useI18n({ useScope: 'local' });
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
}

.page-404__description {
  color: var(--color-zinc-400);
}

.page-404__link {
  font-size: 1.8rem;
  line-height: 1.75rem;
}
</style>

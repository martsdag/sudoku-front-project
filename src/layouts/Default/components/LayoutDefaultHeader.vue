<template>
  <header class="header">
    <div class="header__content">
      <RouterLink :to class="header__link header__link--home">На главную</RouterLink>
      <ul class="header__list">
        <li v-for="link in links" class="header__item" :key="link.to.name">
          <RouterLink :to="link.to" activeClass="header__link--active" class="header__link">Судоку</RouterLink>
        </li>
      </ul>
    </div>
  </header>
</template>

<script setup lang="ts">
import { RouteName } from '@/router';
import { computed } from 'vue';

const to = { name: RouteName.Home };
const links = computed(() => [{ to: { name: RouteName.Sudoku } }]);
</script>

<style>
.header {
  border-bottom: 1px solid var(--color-blue-950);
}

.header__content {
  width: 90%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.header__list {
  display: flex;
  gap: 0.5rem;
  padding: 0;
}

.header__link {
  color: var(--color-blue-950);
}

.header__item {
  list-style-type: none;
}

.header__link--home {
  font-weight: lighter;
}

.header__link--active {
  text-decoration: underline;
  font-weight: bold;
}
</style>

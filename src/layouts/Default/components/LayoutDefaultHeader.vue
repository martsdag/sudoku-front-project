<template>
  <header class="header">
    <div class="header__content _container">
      <RouterLink :to="{ name: RouteName.Home }" activeClass="header__link--active" class="header__link"
        >На главную</RouterLink
      >
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

const links = [{ to: { name: RouteName.Sudoku } }];
</script>

<style>
.header {
  border-bottom: 1px solid var(--color-blue-200);
  background-color: var(--color-white);
}

.header__content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.header__list {
  display: flex;
  gap: 0.5rem;
  padding: 0;
}

.header__item {
  list-style-type: none;
}

.header__link {
  color: var(--color-blue-700);
  text-decoration: none;
  font-size: 18px;
  position: relative;
}

.header__link:hover {
  color: var(--color-blue-500);
}

.header__link::after {
  content: '';
  position: absolute;
  bottom: -3px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--color-blue-400);
  transition: width 0.3s ease;
}

.header__link:hover::after {
  width: 100%;
}

.header__link--active {
  font-weight: bold;
  color: var(--color-blue-500);
}
</style>

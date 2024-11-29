<template>
  <header class="header">
    <div class="header__content _container">
      <ul class="header__links-container">
        <li v-for="link in links" :key="link.to.name">
          <RouterLink :to="link.to" activeClass="header__link--active" class="header__link">
            {{ link.text }}
          </RouterLink>
        </li>
      </ul>
    </div>
  </header>
</template>

<script setup lang="ts">
import { RouteName } from '@/router';

const links = [
  { text: 'Главная', to: { name: RouteName.Home } },
  { text: 'Судоку', to: { name: RouteName.Sudoku } },
];
</script>

<style>
.header {
  border-bottom: 1px solid var(--color-blue-200);
  background-color: var(--color-white);

  .header__content {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  .header__links-container {
    display: flex;
    gap: 1rem;
    padding: 0;
  }

  .header__link {
    color: var(--color-blue-700);
    text-decoration: none;
    font-size: 18px;
    position: relative;

    &:hover {
      color: var(--color-blue-500);

      &::after {
        width: 100%;
      }
    }

    &::after {
      content: '';
      position: absolute;
      bottom: -3px;
      left: 0;
      width: 0;
      height: 0.125rem;
      background-color: var(--color-blue-400);
      transition: width 0.3s ease;
    }

    &.header__link--active {
      font-weight: bold;
      color: var(--color-blue-500);
    }
  }
}
</style>

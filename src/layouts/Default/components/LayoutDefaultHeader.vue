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
      <div class="header__language-button">
        <BaseButton
          v-for="languageButton in languagesButtons"
          :class="[$i18n.locale === languageButton.value && BUTTON.ACTIVE]"
          :key="languageButton.value"
          @click="setLanguage(languageButton.value)"
        >
          {{ languageButton.label }}
        </BaseButton>
      </div>
    </div>
  </header>
</template>

<i18n lang="json">
{
  "En": {
    "mainPage": "Home",
    "sudoku": "Sudoku"
  },
  "Ru": {
    "mainPage": "Главная",
    "sudoku": "Судоку"
  }
}
</i18n>

<script setup lang="ts">
import BaseButton from '@/components/BaseButton';
import { RouteName } from '@/router';
import { useI18n } from 'vue-i18n';
import { i18n } from '@/i18n';
import { BUTTON } from '@/helpers/ui';
import { computed } from 'vue';
import { Language } from '@/types';

const languagesButtons = [
  { label: 'EN', value: Language.En },
  { label: 'RU', value: Language.Ru },
];

const setLanguage = (language: Language) => {
  i18n.global.locale.value = language;
};

const { t } = useI18n({ useScope: 'local' });

const links = computed(() => [
  { text: t('mainPage'), to: { name: RouteName.Home } },
  { text: t('sudoku'), to: { name: RouteName.Sudoku } },
]);
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
    font-size: 1.125rem;
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

  .header__language-button {
    font-size: 1.125rem;
    margin-inline-start: auto;
    display: flex;
    gap: 0.25rem;
  }
}
</style>

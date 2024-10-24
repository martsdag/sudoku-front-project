<template>
  <div class="page-sudoku">
    <div>модель: {{ model }}</div>
    <div class="page-sudoku__buttons">
      <RouterLink
        v-for="difficulty in Object.values(Difficulty)"
        :to="{ name: RouteName.Sudoku, query: { difficulty } }"
        class="button"
        activeClass="button--active"
        :key="difficulty"
      >
        {{ difficulty }}
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import { Difficulty, type Sudoku } from '@/api/sudoku';
import { useSudokuStore } from '@/stores/sudoku';
import { isDifficulty } from '@/helpers/isDifficulty';
import { goToPage404 } from '@/composables/goToPage404';
import { RouteName } from '@/router';

const route = useRoute();
const sudokuStore = useSudokuStore();
const model = ref<Sudoku['puzzle']>([]);

watch(
  () => route.query.difficulty,
  () => {
    const difficulty = route.query.difficulty;

    if (!isDifficulty(difficulty)) {
      return goToPage404();
    }

    sudokuStore.getSudoku(difficulty).then((sudoku) => {
      model.value = sudoku.puzzle;
    });
  },
  { immediate: true },
);
</script>

<style>
.page-sudoku__buttons {
  display: flex;
  gap: 10px;
}

.button--active {
  border-color: var(--color-blue-800);
}
</style>

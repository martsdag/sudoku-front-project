<template>
  <div class="page-sudoku">
    <div>{{ model }}</div>
    <div class="page-sudoku__buttons">
      <RouterLink
        v-for="difficulty in Object.values(Difficulty)"
        :to="{ name: RouteName.Sudoku, query: { difficulty } }"
        :class="[BUTTON.default, difficulty === route.query.difficulty && BUTTON.ACTIVE]"
        :key="difficulty"
      >
        {{ difficulty }}
      </RouterLink>
    </div>
    <table class="page-sudoku__sudoku-grid">
      <tbody>
        <tr v-for="(row, rowIndex) in model" :key="rowIndex">
          <td
            v-for="(cell, cellIndex) in row"
            class="page-sudoku__sudoku-cell"
            :class="{
              'page-sudoku__sudoku-cell_bold-border-right': (cellIndex + 1) % 3 === 0 && cellIndex !== 8,
              'page-sudoku__sudoku-cell_bold-border-bottom': (rowIndex + 1) % 3 === 0 && rowIndex !== 8,
            }"
            :key="cellIndex"
          >
            {{ cell }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import { Difficulty, type Sudoku } from '@/api/sudoku';
import { useSudokuStore } from '@/stores/sudoku';
import { isDifficulty } from '@/helpers/isDifficulty';
import { BUTTON } from '@/helpers/ui';
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
.page-sudoku {
  .page-sudoku__buttons {
    display: flex;
    gap: 10px;
  }

  .page-sudoku__sudoku-grid {
    display: flex;
    justify-content: center;
    border-collapse: collapse;
    background-color: var(--color-white);
  }

  .page-sudoku__sudoku-cell {
    --cell-size: 1.2em;
    width: var(--cell-size);
    height: var(--cell-size);
    border: 1px solid var(--color-black);
    text-align: center;
    vertical-align: middle;
    font-size: 24px;

    &.page-sudoku__sudoku-cell_bold-border-bottom {
      border-bottom-width: 2px;
    }

    &.page-sudoku__sudoku-cell_bold-border-right {
      border-right-width: 2px;
    }
  }
}
</style>

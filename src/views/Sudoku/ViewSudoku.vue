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
    <table class="sudoku-grid">
      <tbody>
        <tr v-for="(row, rowIndex) in model" :key="rowIndex">
          <td
            v-for="(cell, cellIndex) in row"
            :class="{
              'bold-border-right': (cellIndex + 1) % 3 === 0 && cellIndex !== 8,
              'bold-border-bottom': (rowIndex + 1) % 3 === 0 && rowIndex !== 8,
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
    flex-wrap: wrap;
  }
}

.sudoku-grid {
  display: flex;
  justify-content: center;
  border-collapse: collapse;
  width: 100%;
  max-width: 358px;
  margin: 0 auto;
  background-color: #ffffff;
}

td {
  width: 36px;
  height: 36px;
  max-width: 36px;
  max-height: 36px;
  border: 1px solid black;
  text-align: center;
  vertical-align: middle;
  font-size: 24px;
}

.bold-border-right {
  border-right: 2px solid black;
}

.bold-border-bottom {
  border-bottom: 2px solid black;
}
</style>

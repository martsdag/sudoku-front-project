<template>
  <div class="page-sudoku _container">
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
            v-for="(col, colIndex) in row"
            class="page-sudoku__sudoku-cell"
            :class="{
              'page-sudoku__sudoku-cell_bold-border-right': (colIndex + 1) % 3 === 0 && colIndex !== 8,
              'page-sudoku__sudoku-cell_bold-border-bottom': (rowIndex + 1) % 3 === 0 && rowIndex !== 8,
              'page-sudoku__sudoku-cell_error': sudokuStore.validationResult.errors[rowIndex]?.[colIndex] === '+',
            }"
            :key="colIndex"
          >
            <input
              type="text"
              inputmode="numeric"
              maxlength="1"
              :value="col === '-' ? '' : col"
              class="page-sudoku__cell-input"
              :readonly="/\d/.test(String(sudokuStore.sudoku.puzzle?.[rowIndex]?.[colIndex]))"
              @input="(event) => onInput(event, [rowIndex, colIndex])"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import { Difficulty, type Sudoku } from '@/api/sudoku';
import { useSudokuStore } from '@/stores/sudoku';
import { isDifficulty } from '@/helpers/isDifficulty';
import { BUTTON } from '@/helpers/ui';
import { goToPage404 } from '@/composables/goToPage404';
import { RouteName } from '@/router';
import { isNil } from '@/utils/isNil';

const route = useRoute();
const sudokuStore = useSudokuStore();
const model = ref<Sudoku['puzzle']>([]);

const onInput = (event: Event, [rowIndex, colIndex]: [number, number]) => {
  const sanitizedValue = (event.target as HTMLInputElement).value.replace(/[^1-9]/g, '');

  const row = model.value[rowIndex];

  if (isNil(row)) {
    return;
  }

  row[colIndex] = sanitizedValue === '' ? '-' : sanitizedValue;

  sudokuStore.getValidateSudoku(model.value);

  nextTick(() => {
    (event.target as HTMLInputElement).value = sanitizedValue;
  });
};

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
  padding: 16px 0;
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
    font-size: 24px;

    &.page-sudoku__sudoku-cell_bold-border-bottom {
      border-bottom-width: 2px;
    }

    &.page-sudoku__sudoku-cell_bold-border-right {
      border-right-width: 2px;
    }

    &.page-sudoku__sudoku-cell_error {
      &:has(.page-sudoku__cell-input[readonly]) {
        background-color: var(--color-red-200);
      }

      .page-sudoku__cell-input:not([readonly]) {
        color: var(--color-red-600);
      }
    }
  }

  .page-sudoku__cell-input {
    all: unset;
    width: inherit;

    &:not([readonly]) {
      font-family: 'Kalam', cursive;
      color: var(--color-blue-900);
    }
  }
}
</style>

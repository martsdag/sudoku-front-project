<template>
  <div class="page-sudoku">
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
    <div>
      <table class="sudoku-grid">
        <tbody>
          <tr v-for="(box, boxIndex) in model" :key="boxIndex">
            <td v-for="(cell, cellIndex) in box" class="sudoku-grid-cell" :key="cellIndex">
              <input v-if="cell === ''" type="text" maxlength="1" class="sudoku-grid-cell-input" />
              <span v-else>{{ cell }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
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
.page-sudoku__buttons {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.sudoku-container {
  display: flex;
  align-items: center;
  justify-content: center;
}
.sudoku-grid {
  border-collapse: collapse;
  width: 100%;
  max-width: 250 px;
  margin: 0 auto;
  background-color: #ffffff;
}

.sudoku-grid-cell {
  width: 35px;
  height: 35px;
  border: 1px solid #e9ecef;
  text-align: center;
  vertical-align: middle;
  font-size: 24px;
  position: relative;
}

.sudoku-grid-cell-input {
  width: 100%;
  height: 100%;
  font-size: 24px;
  text-align: center;
  border: none;
  outline: none;
  background: transparent;
}

.sudoku-grid-cell:first-child {
  border-left: 2px solid #000;
}

tr:first-child .sudoku-grid-cell {
  border-top: 2px solid #000;
}

.sudoku-grid-cell:nth-child(3n) {
  border-right: 2px solid #000;
}

tr:nth-child(3n) .sudoku-grid-cell {
  border-bottom: 2px solid #000;
}

@media (min-width: 768px) {
  .sudoku-grid {
    max-width: 450px;
  }

  .sudoku-grid-cell {
    width: 50px;
    height: 50px;
    font-size: 30px;
  }

  .sudoku-grid-cell-input {
    font-size: 30px;
  }
}

@media (min-width: 1024px) {
  .sudoku-grid {
    max-width: 600px;
  }

  .sudoku-grid-cell {
    width: 60px;
    height: 60px;
    font-size: 40px;
  }

  .sudoku-grid-cell-input {
    font-size: 40px;
  }
}
</style>

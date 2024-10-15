<template>
  <div>
    <table class="sudoku-grid">
      <tbody>
        <tr v-for="(box, boxIndex) in model" :key="boxIndex">
          <td v-for="(cell, cellIndex) in box" :key="cellIndex" class="sudoku-grid-cell">
            <input
              v-if="cell === ''"
              v-model="model[boxIndex][cellIndex]"
              type="text"
              maxlength="1"
              class="sudoku-grid-cell-input"
              @input="(event) => updateCell(boxIndex, cellIndex, (event.target as HTMLInputElement).value)"
            />
            <span v-else>{{ cell }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { Difficulty } from '@/api/sudoku';
import { useSudokuStore } from '@/stores/sudoku';

const sudokuStore = useSudokuStore();

const model = ref<string[][]>([]);

const updateCell = (boxIndex: number, cellIndex: number, value: string) => {
  if (value.match(/^[1-9]$/) || value === '') {
    model.value[boxIndex][cellIndex] = value;
  }
};

sudokuStore.getSudoku(undefined, Difficulty.Easy).then((sudoku) => {
  model.value = sudoku.puzzle.map((row) => row.map((cell) => (cell === '-' ? '' : cell)));
});
</script>

<style>
.sudoku-grid {
  border-collapse: collapse;
  width: 100%;
  max-width: 320px;
  margin: 0 auto;
  background-color: #ffffff;
  margin-top: 200px;
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
    margin-top: 150px;
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
    margin-top: 200px;
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

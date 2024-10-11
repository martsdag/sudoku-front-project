<template>
  <div>
    <table class="sudoku-table">
      <tbody>
        <tr v-for="(box, boxIndex) in boxes" :key="boxIndex">
          <td v-for="(cell, cellIndex) in box" :key="cellIndex" class="cell">
            <input
              v-if="cell === ''"
              type="text"
              maxlength="1"
              class="cell-input"
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
import { computed } from 'vue';

import { Difficulty } from '@/api/sudoku';
import { useSudokuStore } from '@/stores/sudoku';

const sudokuStore = useSudokuStore();
sudokuStore.getSudoku(undefined, Difficulty.Easy);

const boxes = computed(() => {
  const puzzle = sudokuStore.sudoku?.puzzle || '';
  const grid = [];

  for (let i = 0; i < 9; i++) {
    const box = [];
    for (let j = 0; j < 9; j++) {
      box.push(puzzle[i * 9 + j] === '-' ? '' : puzzle[i * 9 + j]);
    }
    grid.push(box);
  }
  return grid;
});

const updateCell = (boxIndex: number, cellIndex: number, value: string) => {
  if (value.match(/^[1-9]$/) || value === '') {
    const puzzle = sudokuStore.sudoku?.puzzle.split('');
    if (puzzle) {
      puzzle[boxIndex * 9 + cellIndex] = value;
    }
  }
};
</script>

<style lang="css">
.sudoku-table {
  border-collapse: collapse;
  margin-top: 200px;
  width: 600px;
  height: 600px;
  background-color: white;
  border-left: 2px solid #000;
  border-top: 2px solid #000;
}

.cell {
  width: 60px;
  height: 60px;
  border: 1px solid #e9ecef;
  text-align: center;
  vertical-align: middle;
  font-size: 50px;
  position: relative;
}

.cell-input {
  width: 100%;
  height: 100%;
  font-size: 50px;
  text-align: center;
  border: none;
  outline: none;
  background: transparent;
}

.cell:nth-child(3n) {
  border-right: 2px solid #000;
}

tr:nth-child(3n) .cell {
  border-bottom: 2px solid #000;
}
</style>

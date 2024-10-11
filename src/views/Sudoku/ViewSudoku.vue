<template>
  <div>
    <div class="grid">
      <div v-for="(box, boxIndex) in boxes" :key="boxIndex" class="box">
        <div v-for="(cell, cellIndex) in box" :key="cellIndex" class="cell">
          {{ cell }}
        </div>
      </div>
    </div>
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
</script>

<style lang="css">
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 600px;
  height: 600px;
  margin-top: 200px;
  background-color: white;
}

.box {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
  border: 1px solid #000;
}

.cell {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px dotted #e9ecef;
  font-size: 50px;
}
</style>

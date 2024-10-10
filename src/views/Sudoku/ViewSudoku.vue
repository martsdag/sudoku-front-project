<template>
  <div>
    <h1>Sudoku</h1>
    <div>
      <h2>Puzzle:</h2>
      <pre>{{ sudokuStore.sudoku?.puzzle }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Difficulty } from '@/api/sudoku';
import { useSudokuStore } from '@/stores/sudoku';

const sudokuStore = useSudokuStore();
sudokuStore.getSudoku(undefined, Difficulty.Easy);
</script>

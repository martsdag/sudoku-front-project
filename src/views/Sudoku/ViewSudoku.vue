<template>
  <div>
    <div>модель: {{ model }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { Difficulty, type Sudoku } from '@/api/sudoku';
import { useSudokuStore } from '@/stores/sudoku';

const sudokuStore = useSudokuStore();
const model = ref<Sudoku['puzzle']>([]);

sudokuStore.getSudoku(Difficulty.Easy).then((sudoku) => {
  model.value = sudoku.puzzle;
});
</script>

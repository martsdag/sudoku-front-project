<template>
  <div>
    <pre>{{ model }}</pre>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { Difficulty } from '@/api/sudoku';
import { useSudokuStore } from '@/stores/sudoku';

const sudokuStore = useSudokuStore();
const model = ref<string[][]>([]);

sudokuStore.getSudoku(undefined, Difficulty.Easy).then((sudoku) => {
  model.value = sudoku.puzzle;
});
</script>

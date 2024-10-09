<template>
  <div>
    <h1>Sudoku</h1>
    <div>
      <h2>Puzzle:</h2>
      <pre>{{ sudokuStore.sudoku?.puzzle }}</pre>
      <h2>Solution:</h2>
      <pre>{{ sudokuStore.sudoku?.solution }}</pre>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted } from 'vue';

import { useSudokuStore } from '@/stores/sudoku';

export default {
  setup() {
    const sudokuStore = useSudokuStore();

    onMounted(() => {
      sudokuStore.loadSudoku();
    });

    return {
      sudokuStore,
    };
  },
};
</script>

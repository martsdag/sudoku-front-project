<template>
  <div>
    <div>модель: {{ model }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';

import { type Sudoku } from '@/api/sudoku';
import { useSudokuStore } from '@/stores/sudoku';
import { isDifficulty } from '@/helpers/isDifficulty';
import { goToPage404 } from '@/composables/goToPage404';

const route = useRoute();
const sudokuStore = useSudokuStore();
const model = ref<Sudoku['puzzle']>([]);

if (!isDifficulty(route.query.difficulty)) {
  goToPage404();
} else {
  sudokuStore.getSudoku(route.query.difficulty).then((sudoku) => {
    model.value = sudoku.puzzle;
  });
}
</script>

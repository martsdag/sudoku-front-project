import { defineStore } from 'pinia';
import { useAsyncState } from '@vueuse/core';

import { getSudoku as _getSudoku, Difficulty } from '@/api/sudoku';

export const useSudokuStore = defineStore('sudoku', () => {
  const {
    execute: getSudoku,
    isLoading: isLoadingGetSudoku,
    state: sudoku,
  } = useAsyncState((difficulty: Difficulty) => _getSudoku(difficulty), null, {
    immediate: false,
  });

  return {
    sudoku,
    getSudoku,
    isLoadingGetSudoku,
  };
});

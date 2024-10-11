import { defineStore } from 'pinia';
import { useAsyncState } from '@vueuse/core';

import { getSudoku as _getSudoku } from '@/api/sudoku';

export const useSudokuStore = defineStore('sudoku', () => {
  const {
    execute: getSudoku,
    isLoading: isLoadingGetSudoku,
    state: sudoku,
  } = useAsyncState((...[difficulty]: Parameters<typeof _getSudoku>) => _getSudoku(difficulty), null, {
    immediate: false,
  });

  return {
    sudoku,
    getSudoku,
    isLoadingGetSudoku,
  };
});

import { defineStore } from 'pinia';
import { useAsyncState } from '@vueuse/core';

import { getSudoku as _getSudoku } from '@/api/sudoku';

export const useSudokuStore = defineStore('sudoku', () => {
  const {
    execute: getSudoku,
    isLoading: isLoadingGetSudoku,
    state: sudoku,
  } = useAsyncState(_getSudoku, null, {
    immediate: false,
  });

  return {
    sudoku,
    getSudoku,
    isLoadingGetSudoku,
  };
});

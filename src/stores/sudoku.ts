import { defineStore } from 'pinia';

import { getSudoku as _getSudoku } from '@/api/sudoku';
import { useAsyncStateApi } from '@/composables/useAsyncStateApi';

export const useSudokuStore = defineStore('sudoku', () => {
  const {
    execute: getSudoku,
    isLoading: isLoadingGetSudoku,
    state: sudoku,
  } = useAsyncStateApi(_getSudoku, { puzzle: [], solution: [] });

  return {
    sudoku,
    getSudoku,
    isLoadingGetSudoku,
  };
});

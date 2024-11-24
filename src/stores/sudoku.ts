import { defineStore } from 'pinia';

import { getSudoku as _getSudoku, getValidateSudoku as _getValidateSudoku } from '@/api/sudoku';
import { useAsyncStateApi } from '@/composables/useAsyncStateApi';

export const useSudokuStore = defineStore('sudoku', () => {
  const {
    execute: getSudoku,
    isLoading: isLoadingGetSudoku,
    state: sudoku,
  } = useAsyncStateApi(_getSudoku, { puzzle: [], solution: [] });

  const {
    execute: getValidateSudoku,
    isLoading: isLoadingGetValidateSudoku,
    state: validationResult,
  } = useAsyncStateApi(_getValidateSudoku, {
    isOK: true,
    isWin: false,
    errors: [],
  });

  return {
    sudoku,
    getSudoku,
    isLoadingGetSudoku,
    getValidateSudoku,
    isLoadingGetValidateSudoku,
    validationResult,
  };
});

import { defineStore } from 'pinia';

import { getSudoku as _getSudoku, validateSudoku as _validateSudoku } from '@/api/sudoku';
import { useAsyncStateApi } from '@/composables/useAsyncStateApi';

export const useSudokuStore = defineStore('sudoku', () => {
  const {
    execute: getSudoku,
    isLoading: isLoadingGetSudoku,
    state: sudoku,
  } = useAsyncStateApi(_getSudoku, { puzzle: [], solution: [] });

  const {
    execute: validateSudoku,
    isLoading: isLoadingValidateSudoku,
    state: validationResult,
  } = useAsyncStateApi(_validateSudoku, {
    isOK: true,
    isWin: false,
    errors: [],
  });

  return {
    sudoku,
    getSudoku,
    isLoadingGetSudoku,
    validateSudoku,
    isLoadingValidateSudoku,
    validationResult,
  };
});

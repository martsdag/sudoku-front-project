import { defineStore } from 'pinia';

import { getSudoku as _getSudoku, getValidateSudoku as _getValidateSudoku } from '@/api/sudoku';
import { useAsyncStateApi } from '@/composables/useAsyncStateApi';

const getValidateSudokuModelValueInitial = (): Awaited<ReturnType<typeof _getValidateSudoku>> => ({
  isOK: true,
  isWin: false,
  errors: [],
});

export const useSudokuStore = defineStore('sudoku', () => {
  const {
    execute: getSudoku,
    isLoading: isLoadingGetSudoku,
    state: sudoku,
  } = useAsyncStateApi(
    (...params: Parameters<typeof _getSudoku>) =>
      _getSudoku(...params).finally(() => {
        validationResult.value = getValidateSudokuModelValueInitial();
      }),
    { puzzle: [], solution: [] },
  );

  const {
    execute: getValidateSudoku,
    isLoading: isLoadingGetValidateSudoku,
    state: validationResult,
  } = useAsyncStateApi(_getValidateSudoku, getValidateSudokuModelValueInitial());

  return {
    sudoku,
    getSudoku,
    isLoadingGetSudoku,
    getValidateSudoku,
    isLoadingGetValidateSudoku,
    validationResult,
  };
});

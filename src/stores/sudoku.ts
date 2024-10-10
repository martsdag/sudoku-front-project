import { defineStore } from 'pinia';
import { useAsyncState } from '@vueuse/core';

import { _getSudoku, type Difficulty } from '@/api/sudoku';

export const useSudokuStore = defineStore('sudoku', () => {
  const {
    execute: getSudoku,
    isLoading: isLoadingGetSudoku,
    state: sudoku,
  } = useAsyncState(
    async (difficulty: Difficulty) => {
      return _getSudoku(difficulty);
    },
    null,
    {
      immediate: false,
    },
  );

  return {
    sudoku,
    getSudoku,
    isLoadingGetSudoku,
  };
});

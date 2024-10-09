import { defineStore } from 'pinia';
import { useAsyncState } from '@vueuse/core';

import { getSudoku } from '@/api/sudoku';

export const useSudokuStore = defineStore('sudoku', () => {
  const {
    execute: loadSudoku,
    isLoading: isLoadingSudoku,
    state: sudoku,
  } = useAsyncState(
    async (difficulty = 'easy', format = 'string') => {
      const result = await getSudoku(difficulty, format);
      return result;
    },
    null,
    {
      immediate: false,
    },
  );

  return {
    sudoku,
    loadSudoku,
    isLoadingSudoku,
  };
});

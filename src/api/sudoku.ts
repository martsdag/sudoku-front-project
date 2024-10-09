import { client } from './_client';

export const getSudoku = (difficulty: string = 'easy', format: string = 'string') =>
  client(`/sudoku`, {
    params: { difficulty, format },
  });

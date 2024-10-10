import { client } from './_client';

export type Difficulty = 'easy' | 'medium' | 'hard' | 'expert';
export interface SudokuStringFormat {
  puzzle: string;
  solution: string;
}

export type SudokuResponse = SudokuStringFormat;

export const _getSudoku = (difficulty: Difficulty = 'easy') =>
  client<SudokuResponse>(`/sudoku`, {
    params: { difficulty },
  });

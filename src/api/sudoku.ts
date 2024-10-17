import { client } from './_client';

export enum Difficulty {
  Easy = 'easy',
  Medium = 'medium',
  Hard = 'hard',
  Expert = 'expert',
}

export interface Sudoku {
  puzzle: string[][];
  solution: string[][];
}

export const getSudoku = (difficulty: Difficulty) =>
  client<Sudoku>(`/sudoku`, {
    params: { difficulty, format: 'matrix' },
  });

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

export type SudokuField = string | string[][];

export interface ValidationResult {
  isOK: boolean;
  isWin: boolean;
  errors: SudokuField;
}

export const getSudoku = (difficulty: Difficulty) =>
  client<Sudoku>(`/sudoku`, {
    params: { difficulty, format: 'matrix' },
  });

export const validateSudoku = (puzzle: string[][]) =>
  client<ValidationResult>(`/sudoku/validate`, {
    params: { puzzle: JSON.stringify(puzzle), format: 'matrix' },
  });

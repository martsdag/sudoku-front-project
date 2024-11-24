import { client } from './_client';

export enum Difficulty {
  Easy = 'easy',
  Medium = 'medium',
  Hard = 'hard',
  Expert = 'expert',
}

export type SudokuField = string[][];

export interface Sudoku {
  puzzle: SudokuField;
  solution: SudokuField;
}

export interface ValidationResult {
  isOK: boolean;
  isWin: boolean;
  errors: SudokuField;
}

export const getSudoku = (difficulty: Difficulty) =>
  client<Sudoku>(`/sudoku`, {
    params: { difficulty, format: 'matrix' },
  });

export const getValidateSudoku = (puzzle: SudokuField) =>
  client<ValidationResult>(`/sudoku/validate`, {
    params: { puzzle: JSON.stringify(puzzle), format: 'matrix' },
  });

export interface SudokuStringFormat {
  puzzle: string;
  solution: string;
}

export interface SudokuMatrixFormat {
  puzzle: string[][];
  solution: string[][];
}

export type SudokuResponse = SudokuStringFormat | SudokuMatrixFormat;

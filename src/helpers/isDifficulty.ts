import { Difficulty } from '@/api/sudoku';

export const isDifficulty = (argument: unknown): argument is Difficulty =>
  typeof argument === 'string' && Object.values<string>(Difficulty).includes(argument);

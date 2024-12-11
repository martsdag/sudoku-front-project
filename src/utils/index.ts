import type { NotEmptyArray } from '@/types';
import { isNil } from './isNil';

export const isArray = <T>(argument: unknown | Array<T>): argument is Array<T> => Array.isArray(argument);

export const isNotEmptyArray = <T>(argument: unknown | Array<T>): argument is NotEmptyArray<T> =>
  Boolean(isArray(argument) && argument.length);

export const isNotNil = <T>(argument: T | null | undefined): argument is T => !isNil(argument);

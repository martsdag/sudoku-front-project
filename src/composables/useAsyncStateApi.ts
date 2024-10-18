import { useLoadingStore } from '@/stores/loading';
import { useAsyncState as _useAsyncState } from '@vueuse/core';
import type { FetchError } from 'ofetch';
import { cloneDeep } from '@/utils/cloneDeep';

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export const useAsyncStateApi = <Data, Params extends Array<any> = [], Shallow extends boolean = true>(
  ...[promise, initialState, options]: Parameters<typeof _useAsyncState<Data, Params, Shallow>>
) => {
  const useAsyncStateReturn = _useAsyncState(promise, initialState, {
    immediate: false,
    throwError: true,
    ...options,
  });

  const loadingStore = useLoadingStore();

  const _onError = (error: FetchError<Data>) => {
    throw error;
  };

  return {
    ...useAsyncStateReturn,
    execute: async (..._args: Params) => {
      const promise = useAsyncStateReturn
        .execute(options?.delay, ..._args)
        .then(cloneDeep)
        .catch(_onError);

      loadingStore.sources.add(promise);

      return promise.finally(() => loadingStore.sources.delete(promise));
    },
    executeSilent: (..._args: Params) =>
      useAsyncStateReturn
        .execute(options?.delay, ..._args)
        .then(cloneDeep)
        .catch(_onError),
  };
};

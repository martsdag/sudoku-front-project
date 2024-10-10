import { createFetch } from 'ofetch';

import { logout } from '@/helpers/logout';

const STATUS_UNAUTHORIZED = 401;

export const client = createFetch({
  defaults: {
    baseURL: import.meta.env.VITE_API_URL,
    onResponseError({ response }) {
      if (response.status !== STATUS_UNAUTHORIZED) {
        return;
      }

      logout();
    },
  },
});

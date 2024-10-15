import { createFetch } from 'ofetch';

import { logout } from '@/helpers/logout';

export const client = createFetch({
  defaults: {
    baseURL: import.meta.env.VITE_API_URL,
    onResponseError() {
      logout();
    },
  },
});

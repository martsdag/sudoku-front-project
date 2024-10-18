import type { Component } from 'vue';
import { createRouter, createWebHistory, type NavigationGuard } from 'vue-router';

import LayoutDefault from '@/layouts/Default';

export enum LayoutName {
  Default = 'Default',
  Empty = 'Empty',
}

export enum RouteName {
  Home = 'Home',
  Sudoku = 'Sudoku',
  Page404 = 'Page404',
}

export const router = createRouter({
  routes: [
    {
      name: RouteName.Home,
      path: '/',
      component: () => import('@/views/Home'),
    },
    {
      name: RouteName.Sudoku,
      path: '/sudoku',
      component: () => import('@/views/Sudoku'),
    },
    {
      name: RouteName.Page404,
      path: '/:pathMatch(.*)*',
      component: () => import('@/views/Page404'),
    },
  ],
  history: createWebHistory('/'),
});

const loadLayout: NavigationGuard = async (to) => {
  if (!to.meta.layout) {
    to.meta.layoutComponent = LayoutDefault;

    return;
  }

  await import(`@/layouts/${to.meta.layout}/index.ts`)
    .then(({ default: LayoutComponent }: { default: Component }) => {
      to.meta.layoutComponent = LayoutComponent;
    })
    .catch((err) => {
      console.error(`Error while loading ${to.meta.layout} layout:`, err);

      to.meta.layoutComponent = LayoutDefault;
    });
};

router.beforeEach(loadLayout);

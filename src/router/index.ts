import { createRouter, createWebHistory } from 'vue-router';

export enum RouteName {
  Home = 'Home',
  Sudoku = 'Sudoku',
  Page404 = 'Page404',
}

export const router = createRouter({
  routes: [
    {
      name: RouteName.Home,
      path: '/home/:links*',
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

export default router;

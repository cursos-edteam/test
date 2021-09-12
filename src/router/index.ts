import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const beforeEnter = (_to: any, _from: any, next: any): void => {
  const isAuthenticated = window.localStorage.getItem(`${process.env.VUE_APP_SITENAME}_refreshToken`);
  if (isAuthenticated) next();
  else next({ name: 'Login' });
};

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
    beforeEnter,
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkname: "Login" */ '../views/Login.vue'),
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    // beforeEnter,
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: () => import(/* webpackChunkName "NotFound" */ '../views/NotFound.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;

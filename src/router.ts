import { createRouter, createWebHashHistory } from 'vue-router';

import Home from './views/Home.vue';

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/decorator',
      component: () => import('./views/Decorator.tsx')
    },
    {
      path: '/component',
      component: () => import('./views/Component.vue')
    },
    {
      path: '/chart',
      component: () => import('./views/Chart.vue')
    },
    {
      path: '/about',
      name: 'About',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
});

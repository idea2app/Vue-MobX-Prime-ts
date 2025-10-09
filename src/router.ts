import { createRouter, createWebHashHistory } from 'vue-router';

import Home from './views/Home';

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/decorator/class',
      component: () => import('./views/ClassDecorator')
    },
    {
      path: '/decorator/function',
      component: () => import('./views/FunctionDecorator')
    },
    {
      path: '/component',
      component: () => import('./views/Component')
    },
    {
      path: '/chart',
      component: () => import('./views/Chart')
    },
    {
      path: '/about',
      name: 'About',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About')
    }
  ]
});

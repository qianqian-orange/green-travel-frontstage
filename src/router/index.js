import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/home/index.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '/merchandise',
    name: 'Merchandise',
    component: () => import('@/views/merchandise/index.vue'),
    children: [
      {
        path: 'detail/:id',
        name: 'MerchandiseDetail',
        component: () => import('@/views/merchandise/detail/index.vue'),
      },
    ],
  },
  {
    path: '/signIn',
    name: 'SignIn',
    component: () => import('@/views/signIn/index.vue'),
  },
  {
    path: '/level',
    name: 'Level',
    component: () => import('@/views/level/index.vue'),
  },
  {
    path: '/',
    name: 'home',
    component: Home,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
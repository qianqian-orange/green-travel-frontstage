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
    path: '/publicWelfare',
    name: 'PublicWelfare',
    component: () => import('@/views/publicWelfare/index.vue'),
    children: [
      {
        path: 'detail/:id',
        name: 'PublicWelfareDetail',
        component: () => import('@/views/publicWelfare/detail/index.vue'),
      },
      {
        path: 'release',
        name: 'PublicWelfareAdd',
        component: () => import('@/views/publicWelfare/add.vue'),
      },
    ],
  },
  {
    path: '/task',
    component: () => import('@/views/task/index.vue'),
    children: [
      {
        path: 'detail/:id',
        component: () => import('@/views/task/detail.vue'),
        // props: { to: '/task' },
      },
    ],
  },
  {
    path: '/me',
    name: 'Me',
    component: () => import('@/views/me/index.vue'),
    children: [
      {
        path: 'publicWelfareManagement',
        name: 'PublicWelfareManagement',
        component: () => import('@/views/me/publicWelfareManagement/index.vue'),
        children: [
          {
            path: 'detail/:id',
            name: 'PublicWelfareManagementDetail',
            component: () => import('@/views/me/publicWelfareManagement/detail/index.vue'),
          },
        ],
      },
      {
        path: 'task',
        component: () => import('@/views/me/task/index.vue'),
        children: [
          {
            path: 'detail/:id',
            component: () => import('@/views/me/task/detail.vue'),
            // props: { to: '/me/task' }, // 会注入到组件的props属性中
          },
        ],
      },
      {
        path: 'coupon',
        name: 'MyCoupon',
        component: () => import('@/views/me/coupon/index.vue'),
      },
      {
        path: 'conversion',
        name: 'MyConversion',
        component: () => import('@/views/me/conversion/index.vue'),
        children: [
          {
            path: 'detail/:id',
            component: () => import('@/views/me/conversion/detail.vue'),
          },
        ],
      },
    ],
  },
  {
    path: '/analysis',
    name: 'Analysis',
    component: () => import('@/views/analysis/index.vue'),
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
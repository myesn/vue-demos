import Vue from 'vue';
import VueRouter from 'vue-router';

// import Home from '../views/Home.vue';
import Login from '../views/Login.vue';

import Dashboard from '../components/Dashboard.vue';
import Products from '../views/Products.vue';
import Orders from '../views/Orders.vue';
import Coupons from '../views/Coupons/Coupons.vue';
import OrderMock from '../views/OrderMock/OrderMock.vue';
import CheckoutMock from '../views/CheckoutMock/CheckoutMock.vue';

Vue.use(VueRouter);

const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home,
  //   meta: { requiresAuth: true },
  // },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ '../views/About.vue'),
  // },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/admin',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'products',
        name: 'Products',
        component: Products,
        meta: { requiresAuth: true },
      },
      {
        path: 'orders',
        name: 'Orders',
        component: Orders,
        meta: { requiresAuth: true },
      },
      {
        path: 'coupons',
        name: 'Coupons',
        component: Coupons,
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: '/',
    name: 'DashboardAnonmouys',
    component: Dashboard,
    children: [
      {
        path: 'ordermock',
        name: 'OrderMock',
        component: OrderMock,
        meta: { requiresAuth: false },
      },
      {
        path: 'checkoutmock/:id',
        name: 'CheckoutMock',
        component: CheckoutMock,
        meta: { requiresAuth: false },
      },
    ],
  },
  {
    path: '*',
    redirect: '/login',
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  routes,
});

router.beforeEach((to, from, next) => {
  // console.log('to', to, 'from', from, 'next', next);
  if (to.meta.requiresAuth) {
    // console.log(`${to.path} need login`);
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,
      '$1'
    );

    if (token) {
      next();
    } else {
      next({ path: '/login' });
    }

    // 分析：这里不应该调用接口判断，所有的验证都应后台自验证
    // const api = `${this.API_ENDPOINT}/api/user/check`;

    // this.$http.post(api).then((response) => {
    //   const { success } = response.data;
    //   if (success) {
    //     console.log('check ok');
    //   }
    // });
  } else {
    next();
  }
});

export default router;

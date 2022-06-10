import VueRouter from 'vue-router';

const routes = [
  {
    name: 'main',
    path: '/',
    component: () => import('../views/MainPage'),
  },
  {
    name: 'product',
    path: '/product/:id',
    component: () => import('../views/ProductPage')
  },
  {
    name: 'cart',
    path: '/cart',
    component: () => import('../views/CartPage')
  },
  {
    name: 'order',
    path: '/order',
    component: () => import('../views/OrderPage')
  },
  {
    name: 'orderInfo',
    path: '/order/:id',
    component: () => import('../views/OrderInfoPage')
  },
  {
    name: 'notfound',
    path: '*',
    component: () => import('../views/NotFoundPage')
  }
];

const router = new VueRouter({
  // mode: 'history',
  routes,
  base: '/tehnozavr-vue'
});

export default router;

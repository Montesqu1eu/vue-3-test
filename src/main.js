import Vue from 'vue';
import App from './App.vue';
import router from '@/router';
import store from '@/store';
import VueRouter from 'vue-router';
import loader from 'vue-ui-preloader';

Vue.use(VueRouter)
  .use(loader);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

Vue.config.productionTip = false;


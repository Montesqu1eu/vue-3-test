import Vue from 'vue';
import Vuex from 'vuex';
import state from '@/store/state';
import * as mutations from '@/store/mutations';
import * as actions from '@/store/actions';

Vue.use(Vuex);

export default new Vuex.Store(
  {
    state,
    mutations,
    actions,
    getters: {
      cartDetailProducts(state) {
        return state.cartProducts.map(item => {
          const product = state.cartProductsData.find(p => p.product.id === item.productId).product;
          return {
            ...item,
            product: {
              ...product,
              image: product.image.file.url
            }
          };
        });
      },
      cartTotalPrice(state, getters) {
        return getters.cartDetailProducts.reduce((acc, item) => (item.product.price * item.amount) + acc, 0);
      }
    },
  });

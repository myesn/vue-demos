import Vue from 'vue';
import Vuex from 'vuex';

import ProductsModule from './modules/products';
import CartModule from './modules/cart';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  modules: {
    ProductsModule,
    CartModule,
  },
});

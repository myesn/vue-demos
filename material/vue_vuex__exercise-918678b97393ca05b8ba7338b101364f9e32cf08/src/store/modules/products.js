import axios from 'axios';

export default {
  /**
   * 如果希望你的模块具有更高的封装度和复用性，
   * 你可以通过添加 namespaced: true 的方式使其成为带命名空间的模块。
   * 当模块被注册后，它的所有 getter、action 及 mutation 都会自动根据模块注册的路径调整命名
   */
  namespaced: true,
  state: () => ({
    products: [],
    categories: [],
  }),
  getters: {
    // categories(state) {
    //   return state.categories;
    // },
    // products(state) {
    //   return state.products;
    // },
  },
  actions: { // 同步/异步 commit
    getProducts({ commit }) {
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;

      commit('LOADING', true, { root: true });

      axios.get(url).then((response) => {
        commit('PRODUCTS', response.data.products);
        commit('CATEGOEIS', response.data.products);
        commit('LOADING', false, { root: true });
      });
    },
  },
  mutations: { // 同步修改 state
    PRODUCTS(state, payload) {
      state.products = payload;
    },
    CATEGOEIS(state, payload) {
      const categories = new Set();
      payload.forEach((item) => {
        categories.add(item.category);
      });

      state.categories = Array.from(categories);
    },
  },
};

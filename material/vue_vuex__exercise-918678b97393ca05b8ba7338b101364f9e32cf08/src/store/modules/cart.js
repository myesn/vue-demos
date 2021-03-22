import axios from 'axios';

export default {
  /**
   * 如果希望你的模块具有更高的封装度和复用性，
   * 你可以通过添加 namespaced: true 的方式使其成为带命名空间的模块。
   * 当模块被注册后，它的所有 getter、action 及 mutation 都会自动根据模块注册的路径调整命名
   */
  // namespaced: true,
  state: () => ({
    isLoading: false,
    cart: {
      carts: [],
    },
  }),
  getters: {
    // isLoading(state) {
    //   return state.isLoading;
    // },
    // cart(state) {
    //   return state.cart;
    // },
  },
  actions: { // 同步/异步 commit
    updateLoading(context, status) {
      setTimeout(() => {
        context.commit('LOADING', status);
        // context.state.isLoading = status;  // strict: true 下在 mutation handler 外修改是不被允许，会报错
      }, 1000);
    },
    getCart({ commit }) {
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;

      commit('LOADING', true);

      axios.get(url).then((response) => {
        if (response.data.data.carts) {
          commit('CART', response.data.data);
        }

        commit('LOADING', false);
      });
    },
    removeCart({ commit, dispatch }, id) {
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;

      commit('LOADING', true);

      axios.delete(url).then(() => {
        commit('LOADING', false);

        dispatch('getCart');
      });
    },
    addtoCart({ commit, dispatch }, { id, qty }) {
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      const item = {
        product_id: id,
        qty,
      };

      commit('LOADING', true);

      axios.post(url, { data: item }).then(() => {
        commit('LOADING', false);

        dispatch('getCart');
      });
    },
  },
  mutations: { // 同步修改 state
    LOADING(state, status) {
      state.isLoading = status;
    },
    CART(state, payload) {
      state.cart = payload;
    },
  },
};

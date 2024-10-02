import { createStore } from 'vuex';

const store = createStore({
  state: {
    cart: []
  },
  mutations: {
    ADD_TO_CART(state, { codigoProduto, nomeProduto, valorUnitario, valorTotal, quantidadePorTamanho, imagem, cor }) {
      state.cart.push({
        codigoProduto,
        nomeProduto,
        valorUnitario,
        valorTotal,
        quantidadePorTamanho,
        imagem,
        cor
      });
    }
    ,
    REMOVE_FROM_CART(state, index) {
      state.cart.splice(index, 1);
    },
  },
  actions: {
    addToCart({ commit }, payload) {
      commit('ADD_TO_CART', payload);
    },
    removeFromCart({ commit }, index) {
      commit('REMOVE_FROM_CART', index);
    },
  },
  getters: {
    cartItems: state => state.cart,
    cartItemsCount: state => state.cart.length,
  },
});

export default store;

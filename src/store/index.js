import { createStore } from 'vuex';

const store = createStore({
  state: {
    cart: [],
    favorites: [],
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
    },
    ADD_FAVORITE(state, {codigoProduto, nomeProduto, imagem, cor, valorUnitario, valorAntigo}) {
      const index = state.favorites.findIndex(item => item.codigoProduto === codigoProduto);
      if (index !== -1) {
        state.favorites.splice(index, 1);
      } else {
        state.favorites.push({
          codigoProduto,
          nomeProduto,
          imagem,
          cor,
          valorUnitario,
          valorAntigo,
        });
      }
    },
    REMOVE_FROM_CART(state, index) {
      state.cart.splice(index, 1);
    },
  },
  actions: {
    addToCart({ commit }, payload) {
      commit('ADD_TO_CART', payload);
    },
    addFavorite({ commit }, payload) {
      commit('ADD_FAVORITE', payload);
    },
    removeFromCart({ commit }, index) {
      commit('REMOVE_FROM_CART', index);
    },
  },
  getters: {
    cartItems: state => state.cart,
    favoritesItems: state => state.favorites,
    cartItemsCount: state => state.cart.length,
    favoritesItemsCount: state => state.favorites.length,
  },
});

export default store;

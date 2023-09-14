export default {
  state: {
    isLoading: false,
  },
  getters: {
    isLoading: (state) => state.isLoading,
  },
  actions: {
    setLoading({ commit }) {
      commit("SET_LOADING");
    },
  },

  mutations: {
    SET_LOADING(state) {
      state.isLoading = !state.isLoading;
    },
  },
};

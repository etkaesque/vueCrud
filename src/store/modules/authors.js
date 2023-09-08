export default {
  state: {
    authors: [],
    author: null,
  },
  getters: {
    author: (state) => state.author,
    authors: (state) => state.authors,
  },
  actions: {
    async getAuthors({ commit, dispatch }) {
      try {
        const authors = await this.fetchAuthors();
        commit("setAuthors", authors);
      } catch (err) {
        dispatch("set_error", err);
      }
    },

    async getAuthorById({ commit, dispatch  }, id) {
      try {
        const author = await this.fetchAuthorById(id);
        commit("setAuthor", author);
      } catch (err) {
        dispatch("set_error", err);

      }
    },
  },

  mutations: {
    setAuthor(state, author) {
      state.author = author;
    },
    setAuthors(state, authors) {
      state.authors = authors;
    },
  },
};

export default {
  state: {
    authors: [],
    author: "",
    currentAuthorId: "",
    authorSearchTerm: "",
    authorCurentPage: 1,
    authorsPages: [],
    itemsPerPage: POSTS_PER_PAGE,
  },
  getters: {
    author: (state) => state.author,
    authors: (state) => state.authors,
    currentAuthorId: (state) => state.currentAuthorId,
    authorSearchTerm: (state) => state.authorSearchTerm,
    authorCurentPage: (state) => state.authorCurentPage,
    authorsPages: (state) => state.authorsPages,
  },
  actions: {
    async getAuthors({ commit, dispatch }, { term = "", page = 1 }) {
      try {
        dispatch("setLoading");
        const authors = await this.fetchAuthors(term, page);
        commit("SET_AUTHORS", authors);
      } catch (errorMessage) {
        dispatch("setServerResponse", {
          success: false,
          message: errorMessage,
        });
        commit("SET_AUTHORS");
      } finally {
        dispatch("setLoading");
      }
    },

    async getAuthorById({ commit, dispatch }, id) {
      try {
        dispatch("setLoading");
        const author = await this.fetchAuthorById(id);
        commit("SET_AUTHOR", author);
      } catch (errorMessage) {
        dispatch("setServerResponse", {
          success: false,
          message: errorMessage,
        });
        commit("SET_AUTHOR", "");
      }
    },

    async updateAuthor({dispatch}, updatedAuthorData) {
      try {
        const response = await this.updateAuthorInDb(updatedAuthorData);

        dispatch("setServerResponse", {
          success: true,
          message: response,
        });
      } catch (errorMessage) {
        dispatch("setServerResponse", {
          success: false,
          message: errorMessage,
        });
      }
    },
    async createAuthor({ dispatch }, newAuthorData) {
      try {
        const response = await this.createAuthorInDb(newAuthorData);

        dispatch("setServerResponse", {
          success: true,
          message: response,
        });
      } catch (errorMessage) {
        dispatch("setServerResponse", {
          success: false,
          message: errorMessage,
        });
      }
    },
    async deleteAuthorById({ commit, dispatch, getters }, id) {
      try {
        dispatch("setLoading");

        const response = await this.deleteAuthorInDb(id);
        if (getters.authors.length === 1) {
          commit('CONTROL_CURRENT_AUTHOR', (getters.authorCurentPage - 1))
        } 

        dispatch("getAuthors", {term : getters.authorSearchTerm, page: getters.authorCurentPage })
        dispatch("setServerResponse", {
          success: true,
          message: response,
        });
      } catch (errorMessage) {
        dispatch("setServerResponse", {
          success: false,
          message: errorMessage,
        });      } finally {
        dispatch("setLoading");
      }
    },
  },

  mutations: {
    SET_AUTHOR(state, author) {
      state.author = author;
    },
    SET_AUTHORS(state, authors) {
      if (authors == undefined) {
        state.authors = [];
      } else {
        state.authors = authors.data;
        let pages = authors.headers["x-total-count"] / state.itemsPerPage;
        let roundPages = Math.ceil(pages);
        state.authorsPages = state = Array.from(
          { length: roundPages },
          (_, index) => index + 1
        );
      }
    },
    CONTROL_CURRENT_AUTHOR(state, id) {
      state.currentAuthorId = id;
    },
    SET_AUTHOR_SEARCH_TERM(state, term) {
      state.authorCurentPage = 1;
      state.authorSearchTerm = term;
    },
    SET_AUTHOR_CURRENT_PAGE(state, page) {
      state.authorCurentPage = page;
    },
  },
};
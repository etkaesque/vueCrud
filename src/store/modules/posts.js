export default {
  state: {
    posts: [],
    postsCount: 0,
    postsPerPage: POSTS_PER_PAGE,
    currentPost: "",
    pages: [],
    currentPage: 1,
    searchTerm: "",
  },
  getters: {
    posts: (state) => state.posts,
    currentPost: (state) => state.currentPost,
    postsCount: (state) => state.postsCount,
    postsPerPage: (state) => state.postsPerPage,
    pages: (state) => state.pages,
    currentPage: (state) => state.currentPage,
    searchTerm: (state) => state.searchTerm,
  },
  mutations: {
    SET_POSTS(state, posts) {
      if (typeof posts == "undefined") {
        state.posts = [];
      } else {
        state.posts = posts.data;
        state.postsCount = posts.headers["x-total-count"];
        let pages = posts.headers["x-total-count"] / state.postsPerPage;
        let roundPages = Math.ceil(pages);

        state.pages = state = Array.from(
          { length: roundPages },
          (_, index) => index + 1
        );
      }
    },
    SET_CURRENT_POST(state, post) {
      state.currentPost = post;
    },
    SET_CURRENT_PAGE(state, page) {
      state.currentPage = page;
    },
    UPDATE_TERM(state, term) {
      state.currentPage = 1;
      state.searchTerm = term;
    },
  },
  actions: {
    async setPosts({ commit, dispatch }, { term = "", page = 1 }) {
      try {
        console.log("im here")
        dispatch("setLoading");
        const posts = await this.fetchPosts(term, page);
        commit("SET_POSTS", posts);
      } catch (errorMessage) {
      
        dispatch("setServerResponse", {
          success: false,
          message: errorMessage,
        });
        commit("SET_POSTS");
      } finally {
        dispatch("setLoading");
      }
    },

    async getPostById({ commit, dispatch }, id) {
      try {
        dispatch("setLoading");
        const post = await this.fetchPostById(id);
        commit("SET_CURRENT_POST", post);
      } catch (errorMessage) {
   
        dispatch("setServerResponse", {
          success: false,
          message: errorMessage,
        });
        commit("SET_AUTHORS");
        commit("SET_CURRENT_POST", "");
      } finally {
        dispatch("setLoading");
      }
    },

    async createNewPostInDb({ dispatch }, newPostData) {
      try {
        dispatch("setLoading");
        const response = await this.createNewPost(newPostData);

        dispatch("setServerResponse", {
          success: true,
          message: response,
        });
      } catch (errorMessage) {
        dispatch("setServerResponse", {
          success: false,
          message: errorMessage,
        });
      } finally {
        dispatch("setLoading");
      }
    },

    async updatePostInDb({ dispatch }, updatedPostData) {
      try {
        dispatch("setLoading");
        const response = await this.updatePost(updatedPostData);

        dispatch("setServerResponse", {
          success: true,
          message: response,
        });
      } catch (errorMessage) {
        dispatch("setLoading");
        dispatch("setServerResponse", {
          success: false,
          message: errorMessage,
        });
      } finally {
        dispatch("setLoading");
      }
    },

    async deletePostInDb({ commit, dispatch, getters }, post) {
      try {
        dispatch("setLoading");

        const response = await this.deletePost(post);
        if (getters.posts.length === 1) {
          commit('SET_CURRENT_PAGE', (getters.currentPage - 1))
        } 

        dispatch("setPosts", {term : getters.searchTerm, page: getters.currentPage })

        dispatch("setServerResponse", {
          success: true,
          message: response,
        });
      } catch (errorMessage) {
        dispatch("setServerResponse", {
          success: false,
          message: errorMessage,
        });
      } finally {
        dispatch("setLoading");
      }
    },
  },
};
import Vue from "vue";
import Vuex from "vuex";
import authors from "./modules/authors";
import posts from "./modules/posts";
import modal from "./modules/modal";

import notification from "./modules/notification";
import authorsAPI from "./plugins/authorsAPI";
import postsAPI from "./plugins/postsAPI";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    authors,
    posts,
    notification,
    modal,

  },
  plugins: [authorsAPI, postsAPI],
});

export default store;

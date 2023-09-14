import Vue from "vue";
import App from "./App.vue";
import Vuex from "vuex";
import VueRouter from "vue-router";
import store from "../src/store/index.js";
import Routes from "./routes/routes";
import vueDebounce from "vue-debounce";

Vue.use(vueDebounce, {
  listenTo: ["input", "keyup"],
});
Vue.use(Vuex);
Vue.use(VueRouter);

const router = new VueRouter({
  routes: Routes,
  mode: "history",
});

new Vue({
  store: store,
  render: (h) => h(App),
  router: router,
}).$mount("#app");

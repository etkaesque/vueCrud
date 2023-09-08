import Home from "../views/Home.vue";
import Post from "../views/PostDetail.vue";
import Page404 from "../views/Page404.vue"

const routes = [
  { path: "/", component: Home },
  { path: "/post/:id", component: Post },
  { path: "*", component: Page404}
];

export default routes;

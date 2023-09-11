import Home from "../views/Home.vue";
import PostDetail from "../views/PostDetail.vue";
import Posts from "../views/Posts.vue";
import Page404 from "../views/Page404.vue";
import Authors from "../views/Authors.vue";

const routes = [
  {
    path: "/",
    component: Home,
    name: Home,
    children: [
      { path: "posts", component: Posts },
      { path: "authors", component: Authors },
    ],
  },

  { path: "/post/:id", component: PostDetail },
  { path: "*", component: Page404 },
];

export default routes;

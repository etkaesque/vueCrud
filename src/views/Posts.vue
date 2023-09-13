<template>
  <div class="app">
    <Header
      :heading="heading"
      :link="link"
      :button="button"
      @openModal="openModalCreatePost"
    ></Header>

    <Pagination
      :currentPage="currentPage"
      :type="type"
      :lastPage="lastPage"
      :dinamicArray="postsArray"
      :fullArray="pages"
      @changePage="changePostPage"
    ></Pagination>

    <main>
      <Search @search="searchPost"></Search>
      <div v-if="posts.length !== 0">
        <div v-for="(post, index) in posts" :key="index">
          <Post :post="post"> </Post>
        </div>
      </div>

      <div v-if="posts.length == 0">
        <p>No results were found.</p>
      </div>
    </main>
  </div>
</template>

<script>
import Pagination from "../components/pagination.vue";
import Header from "../components/header.vue";
import Search from "../components/search.vue";
import Post from "../components/post.vue";

import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      type: "Posts",
      heading: "Posts",
      isAuthors: true,
      link: `/posts`,
      button: "Create Post",
    };
  },
  components: {
    Header,
    Pagination,
    Post,
    Search,
  },
  computed: {
    ...mapGetters([
      "postsCount",
      "pages",
      "searchTerm",
      "authorsPages",
      "authorSearchTerm",
      "authorCurentPage",
      "posts",
      "searchTerm",
      "currentPage",
    ]),
    lastPage() {
      return this.pages.slice(-1)[0];
    },
    postsArrayFirst() {
      return this.currentPage - 2;
    },
    postsArrayLast() {
      return this.currentPage + 1;
    },
    postsArray() {
      if (this.pages.length < 6) {
        return this.pages;
      } else {
        let array = [];
        this.pages.forEach((item) => {
          array.push(item);
        });

        let first = this.postsArrayFirst;
        let last = this.postsArrayLast;

        if (first < 1) {
          first = 0;
          last = last + 1;
        }
        if (last > array[array.length - 2]) {
          last = array[array.length - 1];
          first = first - 1;
        }

        let customArray = array.slice(first, last);

        return customArray;
      }
    },
  },
  methods: {
    ...mapActions(["changePostPage", "setPosts"]),
    ...mapMutations([
      "SET_CURRENT_PAGE",
      "CONTROL_MODAL",
      "CONTROL_ACTIVE_TAB",
      "UPDATE_TERM",
    ]),

    async changePostPage(page) {
      this.SET_CURRENT_PAGE(page);

      await this.setPosts({ term: this.searchTerm, page: page });
    },
    openModalCreatePost() {
      this.CONTROL_ACTIVE_TAB("Create");
      this.CONTROL_MODAL();
    },
    async searchPost(searchTerm) {
      this.UPDATE_TERM(searchTerm);
      await this.setPosts({ term: searchTerm, page: this.currentPage });
    },
  },
  async created() {
    await this.setPosts({});
    this.UPDATE_TERM();
  },
};
</script>

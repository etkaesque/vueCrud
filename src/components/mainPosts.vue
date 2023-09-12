<template>
  <main>
    <Search :type="`Posts`"></Search>
    <Pagination :type="`Posts`"></Pagination>

    <div v-if="posts.length !== 0">
      <div v-for="(post, index) in posts" :key="index">
        <Post :post="post"> </Post>
      </div>
    </div>

    <div v-if="posts.length == 0">

      <p>
        No results were found.
      </p>
      
    </div>
  </main>
</template>

<script>
import Post from "./post.vue";
import { mapGetters, mapActions, mapMutations } from "vuex";
import Search from "../components/search.vue";
import Pagination from "../components/pagination.vue";

export default {
  computed: {
    ...mapGetters(["posts", "searchTerm", "currentPage"]),
  },
  methods: {
    ...mapMutations(["UPDATE_TERM"]),
    ...mapActions(["setPosts"]),
  },
  components: {
    Post,
    Search,
    Pagination,
  },
  async created() {
    await this.setPosts({});
    this.UPDATE_TERM()
  },
};
</script>

<style>
main div {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
</style>

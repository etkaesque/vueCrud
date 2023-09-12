<template>
  <div>
    <div v-if="type === `Posts`">
      <div v-for="page in postsArray">
        <button
          :class="{ selected: page === currentPage }"
          @click="changePostPage(page)"
        >
          {{ page }}
        </button>
      </div>
    </div>

    <div v-if="type === `Authors`">
      <div v-for="page in authorsPages">
        <button
          :class="{ selected: page === authorCurentPage }"
          @click="changeAuthorPage(page)"
        >
          {{ page }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  props: {
    type: {
      String,
    },
  },
  computed: {
    ...mapGetters([
      "postsCount",
      "pages",
      "searchTerm",
      "authorsPages",
      "authorSearchTerm",
      "currentPage",
      "authorCurentPage",
    ]),
    postsArrayFirst() {
     this.currentPage - 3;
    },
 
    postsArrayLast() {
      return this.currentPage + 2;
    },
    postsArray() {
      let array = this.pages;

      let first = this.postsArrayFirst;
      let last = this.postsArrayLast;

      if (first < 1) {
        first = 0;
      }
      if (last > array.slice(-1)) {
        last = array.slice(-1);
      }

      return array.slice(first, last);
    },
  },
  methods: {
    ...mapActions(["setPosts", "getAuthors"]),
    ...mapMutations(["SET_CURRENT_PAGE", "SET_AUTHOR_CURRENT_PAGE"]),
    async changePostPage(page) {
      this.SET_CURRENT_PAGE(page);

      let array = this.pages;

      let first = this.currentPage - 3;
      let last = this.currentPage + 2;

      if (first < 1) {
        first = 0;
      }
      if (last > array.slice(-1)) {
        last = array.slice(-1);
      }

      console.log(array.slice(first, last));

      await this.setPosts({ term: this.searchTerm, page: page });
    },
    async changeAuthorPage(page) {
      this.SET_AUTHOR_CURRENT_PAGE(page);

      await this.getAuthors({ term: this.authorSearchTerm, page: page });
    },
  },
};
</script>

<style>
.selected {
  background-color: lightblue;
}
</style>

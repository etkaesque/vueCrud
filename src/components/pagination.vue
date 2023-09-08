<template>
  <div>
    <div v-for="page in pages">
      <button @click="changePage(page)">{{ page }}</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  computed: {
    ...mapGetters(["postsCount", "pages", "searchTerm"]),
  },
  methods: {
    ...mapActions(["setPosts"]),
    ...mapMutations(["SET_CURRENT_PAGE"]),
    async changePage(page) {
      this.SET_CURRENT_PAGE(page);

      await this.setPosts({ term: this.searchTerm, page: page });
    },
  },
};
</script>

<style></style>

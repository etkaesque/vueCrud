<template>
  <main>

    <Search :type="`Authors`"></Search>
    <Pagination :type="`Authors`"></Pagination>

    <div v-if="authors.length !== 0">
      <div v-for="(author, index) in authors" :key="index">
    
        <Author :id="author.id" :name="author.name" :created="author.created_at" :updated="author.updated_at"></Author>
      </div>
    </div>

    <div v-if="authors.length == 0">
      <p>No results were found.</p>
    </div>
  </main>
</template>

<script>
import Author from "./author.vue";
import { mapGetters, mapActions,mapMutations } from "vuex";
import Search from "../components/search.vue";
import Pagination from "../components/pagination.vue";

export default {
  computed: {
    ...mapGetters(["authors", "searchTerm", "currentPage", "authorCurentPage", "authorSearchTerm"]),
  },
  methods: {
    ...mapMutations(["SET_AUTHOR_SEARCH_TERM"]),
    ...mapActions(["getAuthors"]),
  },
  components: {
    Author,
    Search,
    Pagination
  },
  async created() {
    await this.getAuthors({})
    this.SET_AUTHOR_SEARCH_TERM()

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

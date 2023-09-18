<template>
  <div class="app">
    <Header
      :heading="heading"
      :link="link"
      :button="button"
      :type="type"
      @openModal="openModalCreateAuthor"
    ></Header>

    <main>
      <Pagination
      :currentPage="authorCurentPage"
      :type="type"
      :fullArray="authorsPages"
      @changePage="changeAuthorPage"
      ></Pagination>
      
      <Search @search="searchAuthor"></Search>

      <div v-if="authors.length !== 0" class="cardWrap">
        <div v-for="(author, index) in authors" :key="index">
          <Author
            :id="author.id"
            :name="author.name"
            :created="author.created_at"
            :updated="author.updated_at"
          ></Author>
        </div>
      </div>

      <div v-if="authors.length == 0">
        <p>No results were found.</p>
      </div>
    </main>
  </div>
</template>

<script>
import Header from "../components/header.vue";
import Author from "../components/author.vue";
import Pagination from "../components/pagination.vue";
import { mapGetters, mapActions, mapMutations } from "vuex";
import Search from "../components/search.vue";

export default {
  data() {
    return {
      type: "Authors",
      heading: "Authors",
      isAuthors: true,
      link: `/authors`,
      button: "Create Author",
    };
  },
  components: {
    Header,
    Pagination,
    Author,
    Search,
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
      "authors",
      "searchTerm",
      "currentPage",
      "authorCurentPage",
      "authorSearchTerm",
    ]),
  },
  methods: {
    ...mapActions(["changeAuthorPage", "getAuthors"]),
    ...mapMutations([
      "SET_AUTHOR_CURRENT_PAGE",
      "CONTROL_ACTIVE_TAB",
      "CONTROL_MODAL",
      "SET_AUTHOR_SEARCH_TERM",
    ]),
    async changeAuthorPage(page) {
      this.SET_AUTHOR_CURRENT_PAGE(page);

      await this.getAuthors({ term: this.authorSearchTerm, page: page });
    },
    openModalCreateAuthor() {
      this.CONTROL_ACTIVE_TAB("CreateAuthor");
      this.CONTROL_MODAL();
    },
    async searchAuthor(searchTerm) {
      this.SET_AUTHOR_SEARCH_TERM(searchTerm);
      await this.getAuthors({
        term: searchTerm,
        page: this.authorCurentPage,
      });
    },
  },

  async created() {
    await this.getAuthors({});
    this.SET_AUTHOR_SEARCH_TERM();
  },
};
</script>

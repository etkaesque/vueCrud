<template>
  <div class="searchWrapper">
    <div v-if="type === `Posts`" class="search">
      <input
        v-debounce:600ms="searchPost"
        v-model="searchTerm"
        name="search"
        id="name"
        type="text"
        @keydown.enter.prevent
        placeholder="search for a post"
      />
    </div>

    <div v-if="type === `Authors`" class="search">
      <input
        v-debounce:600ms="searchAuthor"
        v-model="searchTerm"
        name="search"
        id="name"
        type="text"
        @keydown.enter.prevent
        placeholder="search for an Author"
      />
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
  data() {
    return {
      searchTerm: "",
    };
  },
  computed: {
    ...mapGetters([
      "currentPage",
      "postsCount",
      "postsPerPage",
      "authorCurentPage",
      "authorSearchTerm",
    ]),
  },
  methods: {
    ...mapActions(["setPosts", "getAuthors"]),
    ...mapMutations([
      "UPDATE_TERM",
      "SET_CURRENT_PAGE",
      "SET_AUTHOR_SEARCH_TERM",
    ]),

    async searchPost() {
      this.UPDATE_TERM(this.searchTerm);
      await this.setPosts({ term: this.searchTerm, page: this.currentPage });
    },
    async searchAuthor() {
      this.SET_AUTHOR_SEARCH_TERM(this.searchTerm);
      await this.getAuthors({
        term: this.searchTerm,
        page: this.authorCurentPage,
      });
    },
  },
};
</script>

<style>
.search {
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  row-gap: 3px;
}

.searchWrapper {
  display: flex;
  justify-content: center;
}

button,
input {
  font-size: 1.1rem;
  background-color: whitesmoke;
  border: none;
  padding: 10px;
  margin: 5px;
  border-radius: 5px;
  background-color: rgb(228, 221, 221);
}

button {
  cursor: pointer;
}

button:hover {
  background-color: rgba(228, 221, 221, 0.562);
}

input:focus {
  background-color: rgba(228, 221, 221, 0.562);
}
</style>

<template>
  <div class="search">
    <input
      v-debounce:600ms="search"
      v-model="searchTerm"
      name="search"
      id="name"
      type="text"
      @keydown.enter.prevent
      placeholder="search for a post"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      searchTerm: "",
    };
  },
  computed: {
    ...mapGetters(["currentPage", "postsCount", "postsPerPage"]),
  },
  methods: {
    ...mapActions(["setPosts"]),
    ...mapMutations(["UPDATE_TERM", "SET_CURRENT_PAGE"]),

    async search() {
      this.UPDATE_TERM(this.searchTerm);
      await this.setPosts({ term: this.searchTerm, page: this.currentPage });
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

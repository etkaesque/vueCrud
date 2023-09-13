<template>
  <div class="searchWrapper">
    <div class="search">
      <input
        v-debounce:600ms="search"
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
  computed: {},
  emits: ["search"],
  methods: {
    search() {
      this.$emit("search", this.searchTerm);
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

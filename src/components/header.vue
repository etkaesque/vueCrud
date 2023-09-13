<template>
  <div class="header">
    <div class="header-content">
      <div>
        <router-link :to="link" class="link"
          ><h1>{{ heading }}</h1></router-link
        >
      </div>

      <button @click="openModal">{{ button }}</button>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  props: {
    heading: String,
    isAuthors: Boolean,
    link: String,
    button: String,
  },
  emits: ["openModal"],
  methods: {
    openModal() {
      this.$emit("openModal");
    },
  },
};
</script>

<style scoped>
.header div {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  padding-top: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.header-content {
  display: flex;
  flex-direction: column;
}

.link {
  text-decoration: none;
}

h1:hover {
  color: violet;
}

h1 {
  font-size: 2rem;
  color: #e77171;
  margin-top: 0px;
}
</style>

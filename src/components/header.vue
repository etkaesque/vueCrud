<template>
  <div class="header">
    <div>

      <router-link :to="`/`" class="link"> <h1>Amazing posts by amazing authors</h1></router-link>
    
    </div>

    <div>
      <button @click="openModal">Create Post</button>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  methods: {
    ...mapMutations(["CONTROL_MODAL", "CONTROL_ACTIVE_TAB"]),
    openModal() {
      this.CONTROL_ACTIVE_TAB("Create")
      this.CONTROL_MODAL();
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

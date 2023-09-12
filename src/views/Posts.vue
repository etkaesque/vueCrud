<template>
  <div class="app">
    <Header :heading="heading"></Header>
    <Main></Main>
  </div>
</template>

<script>
import Main from "../components/mainPosts.vue";
import Header from "../components/header.vue";

export default {
  data() {
    return {
      heading: "Posts",
      isAuthors: false,
    };
  },
  components: {
    Main,
    Header,
  },
};
</script>

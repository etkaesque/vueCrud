<template>
  <div class="app">
    <Header :heading="heading" :isAuthors="isAuthors"></Header>
    <MainAuthors></MainAuthors>
  </div>
</template>

<script>
import Header from "../components/header.vue";
import MainAuthors from "../components/mainAuthors.vue";

export default {
  data() {
    return {
      heading: "Authors",
      isAuthors: true,
    };
  },
  components: {
    Header,
    MainAuthors,
  },
};
</script>

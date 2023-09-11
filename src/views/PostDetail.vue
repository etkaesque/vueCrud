<template>
  <div class="app">
    <Header></Header>

    <main class="main">
      <div v-if="currentPost">
        <div class="postInteraction">
          <button @click="activateDeleteNotification">Delete</button>
          <button @click="openModal(`Edit`)">Edit</button>
        </div>

        <div class="info">
          <i>Written by: {{ currentPost.author.name }}</i>

          <DateComponent
            :created="currentPost.created_at"
            :updated="currentPost.updated_at"
          ></DateComponent>
        </div>

        <div class="contentWrapper">
          <h1 class="postTitle">{{ currentPost.title }}</h1>
          <p class="postContent">{{ currentPost.body }}</p>
        </div>
      </div>

      <div v-else>This Article doesn't exist</div>
    </main>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import DateComponent from "../components/date.vue";
import Header from "../components/header.vue";
export default {
  components: {
    DateComponent,
    Header,
  },
  computed: {
    ...mapGetters(["currentPost"]),
  },
  methods: {
    ...mapActions(["getPostById"]),
    ...mapMutations([
      "CONTROL_MODAL",
      "CONTROL_ACTIVE_TAB",
      "CONTROL_ACTIVE_POST",
      "CONTROL_DELETE_NOTIFICATION",
    ]),
    openModal(type) {
      this.CONTROL_ACTIVE_POST(this.$route.params.id);
      this.CONTROL_ACTIVE_TAB(type);
      this.CONTROL_MODAL();
    },
    activateDeleteNotification() {
      this.CONTROL_ACTIVE_POST(this.$route.params.id);
      this.CONTROL_DELETE_NOTIFICATION();
    },
  },
  async created() {
    await this.getPostById(this.$route.params.id);
  },
};
</script>

<style scoped>
.main {
  max-width: 100%;
}
.postInteraction {
  display: flex;
  width: 100%;
  justify-content: flex-end;
}

h1 {
  display: flex;
  justify-content: center;
  align-items: center;
}

.postContent {
  margin-top: 60px;
  max-width: 900px;
  word-wrap: break-word;
}

.info {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.contentWrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>

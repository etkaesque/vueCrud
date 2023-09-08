<template>
  <div class="app">
    <Header></Header>

    <main class="main">
      <div v-if="currentPost" class="centerADiv">
        <div class="postInteraction">
          <button @click="activateDeleteNotification">Delete</button>
          <button @click="openModal(`Edit`)">Edit</button>
        </div>

        <div class="centerADiv">
          <h1>{{ currentPost.title }}</h1>

          <i>Written by: {{ currentPost.author.name }}</i>

          <DateComponent
            :created="currentPost.created_at"
            :updated="currentPost.updated_at"
          ></DateComponent>

          <p>{{ currentPost.body }}</p>
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
    ...mapMutations(["CONTROL_MODAL", "CONTROL_ACTIVE_TAB", "CONTROL_ACTIVE_POST", "CONTROL_DELETE_NOTIFICATION"]),
    openModal(type) {
      this.CONTROL_ACTIVE_POST(this.$route.params.id)
      this.CONTROL_ACTIVE_TAB(type)
      this.CONTROL_MODAL()
    },
    activateDeleteNotification() {
      this.CONTROL_ACTIVE_POST(this.$route.params.id)
      this.CONTROL_DELETE_NOTIFICATION()
    }
  },
  async created() {
    await this.getPostById(this.$route.params.id);
  },
};
</script>

<style scoped>
.postInteraction {
  display: flex;
  width: 100%;
  justify-content: flex-end;
  
}
.centerADiv {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>

<template>
  <div class="article">
    <article>
      <h2>{{ name }}</h2>

      <DateComponent :created="created" :updated="updated"></DateComponent>
    </article>

    <div class="postInteraction">
      <button @click="activateDeleteNotification">Delete</button>
      <button @click="openModal">Edit</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import DateComponent from "./date.vue";

export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
    created: {
      type: String,
      required: true,
    },
    updated: {
      type: String,
      required: true,
    },
  },
  components: {
    DateComponent,
  },
  methods: {
    ...mapMutations([
      "CONTROL_MODAL",
      "CONTROL_ACTIVE_TAB",
      "CONTROL_CURRENT_AUTHOR",
      "CONTROL_DELETE_NOTIFICATION",
      "SET_DELETE_NOTIFICATION",
      "SET_ACTIVE_FOR"
    ]),
    openModal() {
      this.CONTROL_CURRENT_AUTHOR(this.id);
      this.CONTROL_ACTIVE_TAB("EditAuthor");
      this.CONTROL_MODAL();
    },
    activateDeleteNotification() {
      this.SET_ACTIVE_FOR("Author")
      this.SET_DELETE_NOTIFICATION({ success: "", message: "" });
      this.CONTROL_CURRENT_AUTHOR(this.id);
      this.CONTROL_DELETE_NOTIFICATION();
    },
  },
};
</script>

<style scoped>
.post {
  text-decoration: none;
  color: black;
}

.article {
  overflow: hidden;
  max-width: 200px;
  height: 250px;
  border: 0.5px solid;
  padding: 10px;
  box-shadow: 2px 2px 2px black;
  text-decoration: none;
}

.article:hover {
  background-color: rgba(153, 205, 50, 0.3);
}
.postInteraction {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
  align-items: end;
}

.content {
  display: flex;
  flex-direction: column;
}

button {
  width: 80px;
  height: 50px;
  margin: 0px;
}

.postTitle {
  max-width: 200px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>
